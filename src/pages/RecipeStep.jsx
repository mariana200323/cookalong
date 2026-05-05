import { useMemo, useState } from 'react'
import { useEffect } from "react"
import { getRecipeQuiz } from '../Data/recipeQuizzes'
import './RecipeStep.css'

function RecipeStep({ recipe, goBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedIngredients, setCheckedIngredients] = useState(() => new Set())
  const [timerTotalSeconds, setTimerTotalSeconds] = useState(0)
  const [timerSecondsLeft, setTimerSecondsLeft] = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [voices, setVoices] = useState([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('')
  const [rate, setRate] = useState(0.95)
  const [pitch, setPitch] = useState(1.0)
  const [quizSelections, setQuizSelections] = useState([])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const quizQuestions = useMemo(() => getRecipeQuiz(recipe?.id), [recipe?.id])

  useEffect(() => {
    if (recipe?.id == null) return
    setQuizSelections(getRecipeQuiz(recipe.id).map(() => null))
  }, [recipe?.id])

  const ringTimerDone = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) return

      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const master = ctx.createGain()
      master.gain.setValueAtTime(0.0001, now)
      master.gain.exponentialRampToValueAtTime(0.25, now + 0.02)
      master.gain.exponentialRampToValueAtTime(0.0001, now + 1.05)
      master.connect(ctx.destination)

      // A quick 3-tone chime: pleasant but noticeable
      const tones = [880, 1175, 988] // A5, D6-ish, B5-ish
      tones.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(freq, now)
        gain.gain.setValueAtTime(0.0001, now)
        gain.gain.exponentialRampToValueAtTime(0.25, now + 0.02 + i * 0.18)
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18 + i * 0.18)
        osc.connect(gain)
        gain.connect(master)
        osc.start(now + i * 0.18)
        osc.stop(now + 0.18 + i * 0.18)
      })

      // Cleanup
      window.setTimeout(() => {
        try { ctx.close() } catch { /* ignore */ }
      }, 1200)
    } catch {
      // ignore audio errors (autoplay policy, etc.)
    }
  }

  useEffect(() => {
    if (!timerRunning) return
    if (timerSecondsLeft <= 0) {
      setTimerRunning(false)
      ringTimerDone()
      return
    }

    const id = window.setInterval(() => {
      setTimerSecondsLeft((s) => Math.max(0, s - 1))
    }, 1000)

    return () => window.clearInterval(id)
  }, [timerRunning, timerSecondsLeft])

  useEffect(() => {
    setTimerRunning(false)
    setTimerSecondsLeft(0)
    setTimerTotalSeconds(0)
  }, [currentStep])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        nextStep();
      }
      if (e.key === "ArrowLeft") {
        prevStep();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        speakStep();
      }
      if (e.key === "Escape") {
        stopSpeaking()
        stopTimer()
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStep, selectedVoiceURI, rate, pitch, timerRunning, timerSecondsLeft]);

  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis?.getVoices?.() ?? []
      setVoices(v)

      if (!selectedVoiceURI && v.length > 0) {
        const preferred =
          v.find(voice => /Samantha/i.test(voice.name)) ||
          v.find(voice => /Alex/i.test(voice.name)) ||
          v.find(voice => /Google/i.test(voice.name) && /en/i.test(voice.lang)) ||
          v.find(voice => /en/i.test(voice.lang)) ||
          v[0]

        if (preferred?.voiceURI) setSelectedVoiceURI(preferred.voiceURI)
      }
    }

    loadVoices()
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null
      }
    }
  }, [selectedVoiceURI])

  if (!recipe) return null

  const quizAnsweredCount = quizSelections.filter((s) => s !== null).length
  const quizScore = quizQuestions.reduce(
    (acc, q, i) => acc + (quizSelections[i] === q.correctIndex ? 1 : 0),
    0
  )
  const quizComplete = quizQuestions.length > 0 && quizAnsweredCount === quizQuestions.length

  const setQuizChoice = (questionIndex, optionIndex) => {
    setQuizSelections((prev) => {
      const next = [...prev]
      next[questionIndex] = optionIndex
      return next
    })
  }

  const resetQuiz = () => {
    setQuizSelections(quizQuestions.map(() => null))
  }

  const WORD_NUMBERS = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10
  }

  const parseMaybeNumber = (raw) => {
    if (!raw) return null
    const s = String(raw).trim().toLowerCase()
    if (WORD_NUMBERS[s] != null) return WORD_NUMBERS[s]
    const n = Number(s)
    return Number.isFinite(n) ? n : null
  }

  const toSeconds = (amount, unit) => {
    const n = Number(amount)
    if (!Number.isFinite(n)) return null
    return unit.startsWith('min') ? Math.round(n * 60) : Math.round(n)
  }

  const extractTimes = (text) => {
    const t = String(text ?? '')
    const matches = []

    // 1) Range with digits: "30-60 seconds", "2–3 minutes"
    const rangeDigits = /\bfor\s+(?:about\s+|approximately\s+)?(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*(\d+(?:\.\d+)?)\s*(seconds?|secs?|minutes?|mins?)\b/gi
    // 2) Single with digits: "for 1 minute", "for 45 seconds"
    const singleDigits = /\bfor\s+(?:about\s+|approximately\s+)?(\d+(?:\.\d+)?)\s*(seconds?|secs?|minutes?|mins?)\b/gi
    // 3) Worded single: "for one minute"
    const singleWords = /\bfor\s+(?:about\s+|approximately\s+)?(one|two|three|four|five|six|seven|eight|nine|ten)\s*(seconds?|minutes?)\b/gi
    // 4) "a minute or two" / "a second or two"
    const minuteOrTwo = /\bfor\s+(?:another\s+)?(?:a|an)\s*(minute|second)\s+or\s+(one|two|three)\b/gi

    const pushMatch = (m, secondsOptions) => {
      matches.push({
        start: m.index,
        end: m.index + m[0].length,
        text: m[0],
        secondsOptions
      })
    }

    for (const m of t.matchAll(rangeDigits)) {
      const a = parseMaybeNumber(m[1])
      const b = parseMaybeNumber(m[2])
      const unitRaw = (m[3] ?? '').toLowerCase()
      const unit = unitRaw.startsWith('min') ? 'minutes' : 'seconds'
      const s1 = toSeconds(a, unit)
      const s2 = toSeconds(b, unit)
      if (s1 != null && s2 != null) pushMatch(m, [Math.min(s1, s2), Math.max(s1, s2)])
    }

    for (const m of t.matchAll(minuteOrTwo)) {
      const unitRaw = (m[1] ?? '').toLowerCase()
      const unit = unitRaw.startsWith('min') ? 'minutes' : 'seconds'
      const upper = parseMaybeNumber(m[2])
      const s1 = toSeconds(1, unit)
      const s2 = toSeconds(upper ?? 2, unit)
      if (s1 != null && s2 != null) pushMatch(m, [Math.min(s1, s2), Math.max(s1, s2)])
    }

    for (const m of t.matchAll(singleDigits)) {
      const a = parseMaybeNumber(m[1])
      const unitRaw = (m[2] ?? '').toLowerCase()
      const unit = unitRaw.startsWith('min') ? 'minutes' : 'seconds'
      const s = toSeconds(a, unit)
      if (s != null) pushMatch(m, [s])
    }

    for (const m of t.matchAll(singleWords)) {
      const a = parseMaybeNumber(m[1])
      const unitRaw = (m[2] ?? '').toLowerCase()
      const unit = unitRaw.startsWith('min') ? 'minutes' : 'seconds'
      const s = toSeconds(a, unit)
      if (s != null) pushMatch(m, [s])
    }

    // de-dupe overlaps (keep earliest/longest)
    matches.sort((a, b) => a.start - b.start || b.end - a.end)
    const filtered = []
    for (const m of matches) {
      const overlaps = filtered.some(f => !(m.end <= f.start || m.start >= f.end))
      if (!overlaps) filtered.push(m)
    }
    return filtered
  }

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.round(seconds))
    const mm = Math.floor(s / 60)
    const ss = s % 60
    return `${mm}:${String(ss).padStart(2, '0')}`
  }

  const startTimer = (seconds) => {
    const s = Math.max(1, Math.round(seconds))
    setTimerTotalSeconds(s)
    setTimerSecondsLeft(s)
    setTimerRunning(true)
  }

  const stopTimer = () => {
    setTimerRunning(false)
  }

  const resetTimer = () => {
    setTimerRunning(false)
    setTimerSecondsLeft(timerTotalSeconds)
  }

  const currentStepText = recipe.steps[currentStep]
  const timeMatches = useMemo(() => extractTimes(currentStepText), [currentStepText])
  const firstTimeMatch = timeMatches[0] ?? null

  const renderStepText = () => {
    if (!firstTimeMatch) return currentStepText
    const before = currentStepText.slice(0, firstTimeMatch.start)
    const mid = currentStepText.slice(firstTimeMatch.start, firstTimeMatch.end)
    const after = currentStepText.slice(firstTimeMatch.end)
    return (
      <>
        {before}
        <span className="time-highlight">{mid}</span>
        {after}
      </>
    )
  }

  const toggleIngredient = (idx) => {
    setCheckedIngredients((prev) => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  const selectedVoice = useMemo(() => {
    if (!selectedVoiceURI) return null
    return voices.find(v => v.voiceURI === selectedVoiceURI) ?? null
  }, [voices, selectedVoiceURI])

  const chunkText = (text) => {
    const cleaned = String(text ?? '').trim()
    if (!cleaned) return []

    const parts = cleaned
      .split(/(?<=[.!?])\s+|\n+/g)
      .map(s => s.trim())
      .filter(Boolean)

    if (parts.length > 0) return parts
    return [cleaned]
  }

  const speakStep = () => {
    window.speechSynthesis.cancel()

    const step = recipe.steps[currentStep]
    const chunks = chunkText(step)

    chunks.forEach((chunk) => {
      const utterance = new SpeechSynthesisUtterance(chunk)
      utterance.rate = rate
      utterance.pitch = pitch
      if (selectedVoice) utterance.voice = selectedVoice
      window.speechSynthesis.speak(utterance)
    })
  }

  const stopSpeaking = () => {
    window.speechSynthesis.cancel()
  }

  const nextStep = () => {
    if (currentStep < recipe.steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <main className="recipe-step-page">
      <div className="recipe-step-container">
        <button className="back-link" onClick={goBack}>
          ← Back to recipes
        </button>

        <div className="recipe-step-header">
          <p className="step-tag">COOK ALONG GUIDE</p>
          <h1>{recipe.title}</h1>
          <p className="recipe-subtitle">{recipe.description}</p>
        </div>

        <div className="cookalong-layout">
          <aside className="ingredients-card" aria-label="Ingredients">
            <div className="ingredients-header">
              <h2>Ingredients</h2>
              <div className="ingredients-meta">
                <span>⏱ {recipe.time} mins</span>
                <span>•</span>
                <span>{recipe.difficulty}</span>
              </div>
            </div>

            <ul className="ingredients-list">
              {recipe.ingredients.map((item, idx) => {
                const checked = checkedIngredients.has(idx)
                return (
                  <li key={idx} className={checked ? 'checked' : ''}>
                    <label className="ingredient-item">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleIngredient(idx)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                )
              })}
            </ul>
          </aside>

          <section className="step-card">
            <div className="step-progress">
              Step {currentStep + 1} of {recipe.steps.length}
            </div>

            <h2>Current Step</h2>
            <p className="step-text">{renderStepText()}</p>

            {firstTimeMatch && (
              <div className="timer-card" aria-label="Timer">
                <div className="timer-top">
                  <div className="timer-title">Timer</div>
                  <div className="timer-value">{formatTime(timerSecondsLeft || firstTimeMatch.secondsOptions[0])}</div>
                </div>

                <div className="timer-actions">
                  <div className="timer-buttons">
                    {firstTimeMatch.secondsOptions.length === 1 ? (
                      <button
                        type="button"
                        className="timer-start"
                        onClick={() => startTimer(firstTimeMatch.secondsOptions[0])}
                      >
                        Start timer
                      </button>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="timer-start"
                          onClick={() => startTimer(firstTimeMatch.secondsOptions[0])}
                        >
                          Start {formatTime(firstTimeMatch.secondsOptions[0])}
                        </button>
                        <button
                          type="button"
                          className="timer-start secondary"
                          onClick={() => startTimer(firstTimeMatch.secondsOptions[1])}
                        >
                          Start {formatTime(firstTimeMatch.secondsOptions[1])}
                        </button>
                      </>
                    )}

                    {timerTotalSeconds > 0 && (
                      <>
                        <button type="button" className="timer-stop" onClick={stopTimer}>
                          {timerRunning ? 'Stop' : 'Pause'}
                        </button>
                        <button type="button" className="timer-stop" onClick={resetTimer}>
                          Reset
                        </button>
                      </>
                    )}
                  </div>

                  <div className="timer-hint">
                    This step includes a time—press <strong>Start timer</strong> to count down.
                  </div>
                </div>
              </div>
            )}

            <div className="step-buttons">
              <div className="voice-controls">
                <div className="voice-row">
                  <button className="voice-button" onClick={speakStep}>
                    🔊 Play Voice Guide
                  </button>
                  <button className="stop-voice-button" onClick={stopSpeaking}>
                    Stop
                  </button>
                </div>

                <div className="voice-settings">
                  <label className="voice-setting">
                    <span>Voice</span>
                    <select
                      value={selectedVoiceURI}
                      onChange={(e) => setSelectedVoiceURI(e.target.value)}
                    >
                      {voices.length === 0 ? (
                        <option value="">Loading voices…</option>
                      ) : (
                        voices.map(v => (
                          <option key={v.voiceURI} value={v.voiceURI}>
                            {v.name} ({v.lang})
                          </option>
                        ))
                      )}
                    </select>
                  </label>

                  <label className="voice-setting">
                    <span>Speed</span>
                    <input
                      type="range"
                      min="0.75"
                      max="1.2"
                      step="0.01"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                    />
                    <span className="voice-value">{rate.toFixed(2)}×</span>
                  </label>

                  <label className="voice-setting">
                    <span>Pitch</span>
                    <input
                      type="range"
                      min="0.8"
                      max="1.2"
                      step="0.01"
                      value={pitch}
                      onChange={(e) => setPitch(Number(e.target.value))}
                    />
                    <span className="voice-value">{pitch.toFixed(2)}</span>
                  </label>
                </div>
              </div>

              <div className="nav-buttons">
                <button onClick={prevStep} disabled={currentStep === 0}>
                  Previous
                </button>
                <button
                  onClick={nextStep}
                  disabled={currentStep === recipe.steps.length - 1}
                >
                  Next Step
                </button>
              </div>
            </div>
          </section>
        </div>

        {quizQuestions.length > 0 && (
          <section className="recipe-quiz" aria-labelledby="recipe-quiz-heading">
            <h2 id="recipe-quiz-heading" className="recipe-quiz-title">
              Quick check: did you retain it?
            </h2>
            <p className="recipe-quiz-intro">
              Five questions about this recipe. Tap an answer to see if you got it right.
            </p>

            <ol className="recipe-quiz-list">
              {quizQuestions.map((q, qi) => {
                const selected = quizSelections[qi]
                return (
                  <li key={qi} className="recipe-quiz-item">
                    <p className="recipe-quiz-question">
                      <span className="recipe-quiz-num">{qi + 1}.</span> {q.question}
                    </p>
                    <div className="recipe-quiz-options" role="group" aria-label={`Question ${qi + 1}`}>
                      {q.options.map((opt, oi) => {
                        const isSelected = selected === oi
                        const isCorrect = oi === q.correctIndex
                        let optionClass = 'recipe-quiz-option'
                        if (selected !== null) {
                          if (isCorrect) optionClass += ' correct'
                          else if (isSelected && !isCorrect) optionClass += ' incorrect'
                        } else if (isSelected) {
                          optionClass += ' selected'
                        }
                        return (
                          <button
                            key={oi}
                            type="button"
                            className={optionClass}
                            disabled={selected !== null}
                            onClick={() => setQuizChoice(qi, oi)}
                          >
                            {opt}
                          </button>
                        )
                      })}
                    </div>
                  </li>
                )
              })}
            </ol>

            {quizComplete && (
              <div className="recipe-quiz-score" role="status">
                <strong>
                  Score: {quizScore} / {quizQuestions.length}
                </strong>
                {quizScore === quizQuestions.length
                  ? ' Great job—you nailed this recipe.'
                  : ' Nice work—review any missed steps above.'}
              </div>
            )}

            <button type="button" className="recipe-quiz-reset" onClick={resetQuiz}>
              Reset quiz
            </button>
          </section>
        )}
      </div>
    </main>
  )
}

export default RecipeStep
import { useMemo, useState } from 'react'
import { useEffect } from "react"
import './RecipeStep.css'

function RecipeStep({ recipe, goBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [checkedIngredients, setCheckedIngredients] = useState(() => new Set())
  const [voices, setVoices] = useState([])
  const [selectedVoiceURI, setSelectedVoiceURI] = useState('')
  const [rate, setRate] = useState(0.95)
  const [pitch, setPitch] = useState(1.0)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

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
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentStep, selectedVoiceURI, rate, pitch]);

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
            <p className="step-text">{recipe.steps[currentStep]}</p>

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
      </div>
    </main>
  )
}

export default RecipeStep
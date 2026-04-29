import { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import './SearchPopover.css'

function SearchPopover({
  searchTerm,
  setSearchTerm,
  onSubmitSearch,
  className = '',
}) {
  const [showSearch, setShowSearch] = useState(false)
  const searchWrapRef = useRef(null)
  const searchButtonRef = useRef(null)

  useEffect(() => {
    if (!showSearch) return

    const handlePointerDown = (e) => {
      const wrap = searchWrapRef.current
      const button = searchButtonRef.current
      const target = e.target
      if (!wrap || !button) return

      if (wrap.contains(target) || button.contains(target)) return
      setShowSearch(false)
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setShowSearch(false)
    }

    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [showSearch])

  return (
    <>
      <button
        type="button"
        className={`search-icon ${className}`.trim()}
        aria-label={showSearch ? 'Close search' : 'Open search'}
        aria-expanded={showSearch}
        onClick={() => setShowSearch(!showSearch)}
        ref={searchButtonRef}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M10 4a6 6 0 104.472 10.03l3.749 3.75a1 1 0 001.414-1.415l-3.75-3.749A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
        </svg>
      </button>

      <div
        className={`search-popover ${showSearch ? 'open' : ''}`}
        ref={searchWrapRef}
        aria-hidden={!showSearch}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={() => {
            setShowSearch(false)
            onSubmitSearch()
          }}
        />
        <div className="search-hint">
          Tip: press <strong>Enter</strong> to search.
        </div>
      </div>
    </>
  )
}

export default SearchPopover

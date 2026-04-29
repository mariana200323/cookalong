// SearchBar.jsx handles user input for searching recipes.
// It should update the search term and trigger filtering or navigation to the recipes page.
import './SearchPopover.css'

function SearchBar({ searchTerm, setSearchTerm, onSearch }) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSearch();
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button type="button" className="search-button" onClick={onSearch} aria-label="Search">
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M10 4a6 6 0 104.472 10.03l3.749 3.75a1 1 0 001.414-1.415l-3.75-3.749A6 6 0 0010 4zm0 2a4 4 0 110 8 4 4 0 010-8z" />
                </svg>
                <span className="search-button-text">Search</span>
            </button>
        </div>
    );
}

export default SearchBar;
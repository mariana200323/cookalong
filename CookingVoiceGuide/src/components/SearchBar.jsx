// SearchBar.jsx handles user input for searching recipes.
// It should update the search term and trigger filtering or navigation to the recipes page.

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
            <button type="button" className="search-button" onClick={onSearch}>🔍</button>
        </div>
    );
}

export default SearchBar;
import React, {useState} from "react";

// For keyword searching by typing the term
export default function SearchBar(props){
    const [innerSearch, setInnerSearch] = useState('');
    return (
        <span className="KeywordSearch">
            <input
                aria-labelledby="search-button"
                name="IndustrySearch"
                id="IndustrySearch"
                className="SearchInput"
                type="search"
                value={innerSearch}
                onChange={(e) => setInnerSearch(e.target.value)}
            />
            <button 
                id="search-button" 
                className="SearchBtn"
                type="button"
                onClick={() => props.onSubmit(innerSearch)}    
            >
                Search
            </button>
        </span>
    );
}
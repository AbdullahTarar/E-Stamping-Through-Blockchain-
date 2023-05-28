import VerifyData from './VerifyData';
import React, { useRef, useState } from 'react';
import icon from "./icon.png";

function SearchBar({ searchText, setSearchText, onSearch }) {
  const searchRef = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === 'Escape') {
      setSearchText('');
      searchRef.current.blur();
    }
  };

  return (
    <>
      <p className='shead'>
        The E-Stamp Blockchain Explorer
      </p>
      <div className="input-group mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="Search by Stamp ID  " 
          value={searchText} 
          onChange={(e) => setSearchText(e.target.value)} 
          onKeyPress={handleKeyPress} 
          onKeyUp={handleKeyUp}
          ref={searchRef} 
        />
        <div className="input-group-append">
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={onSearch}
          >
            <img className="searchicon" src={icon} alt="Search" />
          </button>
        </div>
      </div>
    </>
  );
}

function VerifyBar() {
  const [searchText, setSearchText] = useState('');
  const handleSearch = () => {
    // perform search using searchText state
    console.log('Search initiated for:', searchText);
  };

  return (
    <div className='outerdiv'>
      <div className='verifysearch'>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          onSearch={handleSearch}
        />
      </div>
      <VerifyData searchText={searchText} />
    </div>
  );
}

export default VerifyBar;
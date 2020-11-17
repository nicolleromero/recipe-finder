import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../recoil/atoms';

export default function Search() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [title, setTitle] = useState('');

  function handleSetSearchTerm(event) {
    event.preventDefault();

    setSearchTerm(title);
  }

  return (
    <div>
      <div className="center-children search-row">
        <form onSubmit={handleSetSearchTerm}>
          <div className="row">
            <input
              type="text"
              className="form-field"
              placeholder="Name of the dish"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button
              className="search"
              type="submit"
              disabled={!title.trim()}
            >
              Search
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}
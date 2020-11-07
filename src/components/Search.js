import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from './App';

export default function Search() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchState);
  const [title, setTitle] = useState('');

  function handleSetSearchTerm(event) {
    event.preventDefault();

    setSearchTerm(title);

  }

  return (
    <div>
      <div className="center-children">
        <form onSubmit={handleSetSearchTerm}>
          <input
            type="text"
            className="form-field"
            placeholder="Name of the dish"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            variant="outline-secondary"
            disabled={!title.trim()}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
}
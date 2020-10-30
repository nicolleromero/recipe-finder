import React, { useState } from 'react';

export default function Search(props) {
  const [title, setTitle] = useState('');

  function handleSetSearchTerm(event) {
    event.preventDefault();

    console.log("title", title);
    props.setSearchTerm(title);

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
            className="add-button"
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
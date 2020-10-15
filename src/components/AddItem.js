import React, { useState } from 'react';

export default function AddItem(props) {
  const [title, setTitle] = useState('');

  // Create a new item from form data
  function handleCreateNewitem(event) {
    event.preventDefault();

    const newItem = { id: Date.now(), title: title, image: '', ingredients: [] };
    props.onAddItem(newItem);
    console.log("New item created:", newItem);

    setTitle('');
  }

  return (
    <div>
      <div className="center-children">
        <form onSubmit={handleCreateNewitem}>
          <input
            type="text"
            className="form-field"
            placeholder="Title of item"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            type="submit"
            className="add-button"
            variant="outline-secondary"
            disabled={!title.trim()}
          >
            Add item
          </button>
        </form>
      </div>
    </div>
  );
}
import React from 'react';

export default function Filter(props) {

  return (
    <div className="center-children">
      <input
        type="text"
        placeholder="Enter an ingredient"
        className="form-field"
        value={props.filterText}
        onChange={(e) => props.onFilter(e.target.value)}
      />
    </div>
  )
}
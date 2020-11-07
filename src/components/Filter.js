import React from 'react';
import { useRecoilState } from 'recoil';
import { filterState } from './App';

export default function Filter() {
  const [filterText, setFilterText] = useRecoilState(filterState);

  return (
    <div className="center-children">
      <input
        type="text"
        placeholder="Omit by these ingredients"
        className="form-field"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
    </div>
  )
}
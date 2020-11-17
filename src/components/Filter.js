import React from 'react';
import { useRecoilState } from 'recoil';
import { filterState, inputState, selectedState, optionsState } from '../recoil/atoms';
import TokenInput from 'react-tokeninput';
import ComboboxOption from 'react-tokeninput';

import './Filter.css';

export default function Filter() {
  const [selected, setSelected] = useRecoilState(selectedState); // []
  const [input, setInput] = useRecoilState(inputState); // ""
  const [options, setOptions] = useRecoilState(optionsState); // []

  function handleChange(value) {
    setSelected(value);
  }

  function handleInput(userInput) {
    setInput(userInput);
    filterTags(input);
    console.log("userInput", userInput);
  }

  const filterTags = (userInput) => {
    if (userInput === '')
      return setOptions([]);

    return selected
      .map(function (value) { return value.name })
  };

  const renderComboboxOptions = () => {
    return options.map(function (name) {
      return (
        <ComboboxOption
          key={name.id}
          value={name}
          isFocusable={name.name.length > 1}
        >{name.name}</ComboboxOption>
      );
    });
  };

  function handleSelect(value, combobox) {
    if (typeof value === 'string') {
      value = { id: value, name: value };
    }

    setSelected([...selected, value]);
  }

  function handleRemove(value) {
    let selectedOptions = selected.slice();
    console.log(selected);
    let removeIndex = selectedOptions.indexOf(value);

    if (removeIndex > -1) {
      selectedOptions.splice(removeIndex, 1);
    }

    setSelected(selectedOptions);
  }

  renderComboboxOptions();


  return (
    <div className="search-row">
      {/* <input
        type="text"
        placeholder="Omit by these ingredients"
        className="form-field-filter"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      /> */}
      <TokenInput
        // isLoading={this.state.loading}
        // loadingComponent={loadingComponent}
        menuContent={options}
        onChange={handleChange}
        onInput={handleInput}
        onSelect={handleSelect}
        onRemove={handleRemove}
        selected={selected}
        placeholder={selected.length > 0 ? '' : 'Omit by these ingredients'}
      />
    </div>
  )
}
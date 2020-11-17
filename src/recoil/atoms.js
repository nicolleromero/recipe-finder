import { atom } from 'recoil';

const dishListState = atom({
  key: 'dishListState',
  default: [],
});

const filterState = atom({
  key: 'filterState',
  default: [],
});

const inputState = atom({
  key: 'inputState',
  default: '',
});

const selectedState = atom({
  key: 'selectedState',
  default: [],
});

const optionsState = atom({
  key: 'optionsState',
  default: [],
});

const searchState = atom({
  key: 'searchState',
  default: '',
});

const loadingState = atom({
  key: 'loadingState',
  default: true,
});

export { dishListState, inputState, filterState, selectedState, optionsState, searchState, loadingState };
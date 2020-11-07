import React, { useEffect } from 'react';
import { atom, selector, useRecoilValue, useRecoilState } from 'recoil';
import { Spinner } from 'react-bootstrap';

import Search from './Search';
import Filter from './Filter';
import ItemList from './ItemList';

import './App.css';

const dishListState = atom({
  key: 'dishListState',
  default: [],
});

const filterState = atom({
  key: 'filterState',
  default: '',
});

const searchState = atom({
  key: 'searchState',
  default: '',
});

const loadingState = atom({
  key: 'loadingState',
  default: true,
});

const filteredDishListState = selector({
  key: 'filteredDishListState',
  get: ({ get }) => {
    const filter = get(filterState);
    const list = get(dishListState);

    if (filter) {
      return list.filter((dish) => {
        for (let term of filter.split(",")) {
          for (let ingredient of dish.ingredients) {
            if (ingredient.toLowerCase().includes(term.toLowerCase())) {
              return false;
            }
          }
          if (dish.title.toLowerCase().includes(term.toLowerCase())) {
            return false;
          }
        }
        return true;
      });
    } else {
      return list;
    }
  },
});

// const APP_ID = {provide your own}
// const APP_KEY = {provide your own}

export { dishListState, filterState, searchState, filteredDishListState };

export default function App() {
  const [list, setList] = useRecoilState(dishListState);
  const searchTerm = useRecoilValue(searchState);
  const [filterText, setFilterText] = useRecoilState(filterState);
  const filteredDishes = useRecoilValue(filteredDishListState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
  const TARGET_URL = 'https://api.edamam.com/search?q=' + encodeURIComponent(searchTerm);
  const URL = PROXY_URL + TARGET_URL + "&app_id=" + APP_ID + "&app_key=" + APP_KEY;

  async function getList() {
    const response = await fetch(URL);

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.log(message);
      throw new Error(message);
    }

    const data = await response.json();

    return data.hits.map((item) => {
      return {
        id: item.recipe.uri,
        title: item.recipe.label,
        image: item.recipe.image,
        ingredients: item.recipe.ingredientLines,
      };
    })
  }

  useEffect(() => {
    let mounted = true;

    if (!searchTerm) {
      return () => {
        mounted = false;
      };
    }

    setFilterText('');

    getList()
      .then(items => {
        if (mounted) {
          setList((list) => items);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [searchTerm])

  return (
    <div className="site-wrapper">
      <div>
        <div className="d-flex justify-content-center inline align-items-center">
          <h1>
            Recipe Finder & Filter
          </h1>
        </div>
        <Search />
        {searchTerm && loading && (
          <div>
            <div className="d-flex justify-content-center inline align-items-center">
              <Spinner animation="border" variant="secondary" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          </div >
        )}
        {list.length > 0 && (
          <div>
            <Filter />
            <ItemList />
          </div>
        )}
      </div>
    </div>
  );
}
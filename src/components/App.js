import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import AddItem from './AddItem';
import Filter from './Filter';
import ItemList from './ItemList';

import './App.css';

const APP_ID = ;
const APP_KEY = ;

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const TARGET_URL = 'https://api.edamam.com/search?q=' + encodeURIComponent('crepes');
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

export default function App() {
  const [list, setList] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getList()
      .then(items => {
        if (mounted) {
          setList((list) => [...items, ...list]);
        }
      })
      .finally(() => setLoading(false));

    return () => {
      mounted = false;
    };
  }, [])

  // Add a new item to the items array
  function handleAddItem(newItem) {
    setList((list) => [...list, newItem]);
  };

  // Delete an item from the items array
  function handleDeleteItem(itemId) {
    setList((list) => list.filter((item) => item.id !== itemId));
  }

  let newList = list;

  if (filterText) {
    newList = newList.filter((dish) => {
      for (let ingredient of dish.ingredients) {
        if (ingredient.includes(filterText)) {
          return true;
        }
      }
      if (dish.title.includes(filterText)) {
        return true;
      }
      return false;
    });
  }

  return (
    <div className="site-wrapper">
      <div>
        <div className="d-flex justify-content-center inline align-items-center">
          <h1>
            Some Great Title Here
          </h1>
        </div>
        <AddItem
          onAddItem={handleAddItem}
        />
        {
          loading && (
            <div>
              <div className="d-flex justify-content-center inline align-items-center">
                <Spinner animation="border" variant="secondary" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            </div >
          )
        }
        {list.length > 0 && (
          <div>
            <Filter
              filterText={filterText}
              onFilter={setFilterText}
            />
            <ItemList
              newList={newList}
              onDeleteItem={handleDeleteItem}
              listTitle="Saved Items"
            />
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

// import AddItem from './AddItem';
import Search from './Search';
import Filter from './Filter';
import ItemList from './ItemList';

import './App.css';

// const APP_ID = Add your own from https://developer.edamam.com/
// const APP_KEY = Add your own from https://developer.edamam.com/

export default function App() {
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterText, setFilterText] = useState('');
  const [loading, setLoading] = useState(true);

  console.log("searchTerm", searchTerm);

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

    getList()
      .then(items => {
        if (mounted) {
          setList((list) => [...items, ...list]);
        }
      })
      .finally(() => setLoading(false));

    // setSearchTerm('');

    return () => {
      mounted = false;
    };
  }, [searchTerm])

  // Add a new item to the items array
  // function handleAddItem(newItem) {
  //   setList((list) => [...list, newItem]);
  // };

  // Delete an item from the items array
  function handleDeleteItem(itemId) {
    setList((list) => list.filter((item) => item.id !== itemId));
  }

  let newList = list;

  if (filterText) {
    newList = newList.filter((dish) => {
      for (let term of filterText.split(",")) {
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
  }

  return (
    <div className="site-wrapper">
      <div>
        <div className="d-flex justify-content-center inline align-items-center">
          <h1>
            Recipe Finder & Filter
          </h1>
        </div>
        <Search
          setSearchTerm={setSearchTerm}
        />
        {/* <AddItem
          onAddItem={handleAddItem}
        /> */}
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
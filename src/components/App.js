import React, { useEffect } from 'react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { Spinner } from 'react-bootstrap';

import Search from './Search';
import Filter from './Filter';
import ItemList from './ItemList';
import { getList } from './Fetch';
import { dishListState, filterState, searchState, loadingState } from '../recoil/atoms';

import './App.css';

export default function App() {
  const [list, setList] = useRecoilState(dishListState);
  const searchTerm = useRecoilValue(searchState);
  const [filterText, setFilterText] = useRecoilState(filterState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    let mounted = true;

    if (!searchTerm) {
      return () => {
        mounted = false;
      };
    }

    setFilterText([]);

    getList(searchTerm)
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
    <div className="site-wrapper background">
      <div>
        <div className="d-flex justify-content-left inline search-row">
          <h1>
            Recipe Finder & Filter
          </h1>
          <Search />
        </div>
        {searchTerm && loading && (
          <div>
            <div className="d-flex justify-content-center inline align-items-center spinner">
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
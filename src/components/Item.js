import React from 'react';
import { useRecoilState } from 'recoil';
import { Accordion } from 'react-bootstrap';

import { dishListState } from './App';

export default function Item(props) {
  const [list, setList] = useRecoilState(dishListState);

  // Delete an item from the items array
  function handleDeleteItem(itemId) {
    const updatedList = list.filter((item) => item.id !== itemId);
    setList(updatedList);
  }

  return (
    <li>
      <div className="left-list">
        <Accordion>
          <div className="left-list">
            <div className="card-head list-item">
              <button
                className="btn btn-sm delete-button"
                onClick={() => handleDeleteItem(props.item.id)}
              >
                ✕
              </button>
              <img className="image" src={props.item.image} />
              <span className="item text-truncate">{props.item.title}</span>
              <Accordion.Toggle as="button" variant="link" eventKey="0" className="recipe-toggle">
                View Ingredients ⬍
              </Accordion.Toggle>
              <Accordion.Collapse eventKey="0">
                <div className="box">
                  <ul>
                    <span><h4>Ingredients:</h4></span>
                    {props.item.ingredients.map((ingredient, index) => {
                      return (
                        <li key={index}>
                          <span className="fractions">{ingredient}</span>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </Accordion.Collapse>
            </div>
          </div>
        </Accordion>
      </div>
    </li>
  )
}
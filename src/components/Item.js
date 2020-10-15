import React from 'react';
import { Accordion } from 'react-bootstrap';

export default function Item(props) {

  return (
    <li>
      <div className="left-list">
        {/* <span className="item">{props.item.title}</span> */}
        {/* <span>[Ingredients: {props.dish.ingredients}]</span> */}
        <Accordion>
          <div className="left-list">
            <div className="card-head list-item">
              <button
                className="btn btn-sm delete-button"
                onClick={() => props.onDeleteItem(props.item.id)}
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
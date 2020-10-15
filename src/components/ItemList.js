import React from 'react';

import Item from './Item';

export default function ItemList(props) {

  // Only render if the item array includes an item
  if (!props.newList) {
    return null;
  }

  return (
    <div>
      <div className="center-children">
        <ul>
          {props.newList.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
                onDeleteItem={props.onDeleteItem}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}

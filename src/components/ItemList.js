import React from 'react';
import { useRecoilValue } from 'recoil';

import Item from './Item';
import { filteredDishListState } from './App';

export default function ItemList() {
  const filteredDishes = useRecoilValue(filteredDishListState);

  return (
    <div>
      <div className="center-children">
        <ul>
          {filteredDishes.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
              />
            )
          })}
        </ul>
      </div>
    </div>
  );
}
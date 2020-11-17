import React from 'react';
import { useRecoilValue } from 'recoil';

import Item from './Item';
import { filteredDishListState } from '../recoil/selector';

export default function ItemList() {
  const filteredDishes = useRecoilValue(filteredDishListState);

  return (
    <div>
      <div className="grid-container">
        <div>
          {filteredDishes.map((item) => {
            return (
              <Item
                item={item}
                key={item.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  );
}
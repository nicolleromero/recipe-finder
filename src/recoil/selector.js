import { selector } from 'recoil';
import { dishListState, selectedState } from '../recoil/atoms';

const filteredDishListState = selector({
  key: 'filteredDishListState',
  get: ({ get }) => {
    const selected = get(selectedState);
    const list = get(dishListState);

    if (selected) {
      return list.filter((dish) => {
        for (let term of selected) {
          for (let ingredient of dish.ingredients) {
            if (ingredient.toLowerCase().includes(term.name.toLowerCase())) {
              return false;
            }
            if (dish.title.toLowerCase().includes(term.name.toLowerCase())) {
              return false;
            }
          }
        }
        return true;
      });
    } else {
      return list;
    }
  },
});

export { filteredDishListState };
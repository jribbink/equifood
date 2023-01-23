import { useSelector, useStore } from 'react-redux';
import { RootState } from '../redux/store';

export function useCart() {
  const store = useStore<RootState>();
  const cart = useSelector<RootState, RootState['cart']>(
    () => store.getState().cart
  );

  return cart;
}

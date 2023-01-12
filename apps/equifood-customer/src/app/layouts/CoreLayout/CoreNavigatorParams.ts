import { Merchant, Order, Item } from '@equifood/api-interfaces';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { StackScreenProps } from '@react-navigation/stack';

export type CoreTabParams = {
  home: undefined;
  map: undefined;
  orders: undefined;
  account: undefined;
  orderConfirm: undefined;
};

export type CoreStackParams = {
  core: NavigatorScreenParams<CoreTabParams>;
  merchant: {
    merchant: Merchant;
  };
  order: {
    order: Order;
  };
  cart: undefined;
  orderConfirm: {
    merchant: Merchant;
    items: Item[];
    quantities: { id: string; quantity: number }[];
  };
};

export type CoreNavigationProps<T extends keyof CoreTabParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreTabParams, T>,
    StackScreenProps<CoreStackParams, 'core'>
  >;

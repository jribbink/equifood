import { Merchant, Order } from '@equifood/api-interfaces';
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
};

export type CoreStackParams = {
  core: NavigatorScreenParams<CoreTabParams>;
  merchant: {
    merchant: Merchant;
  };
  cart: undefined;
  order: Order;
};

export type CoreNavigationProps<T extends keyof CoreTabParams> =
  CompositeScreenProps<
    BottomTabScreenProps<CoreTabParams, T>,
    StackScreenProps<CoreStackParams, 'core'>
  >;

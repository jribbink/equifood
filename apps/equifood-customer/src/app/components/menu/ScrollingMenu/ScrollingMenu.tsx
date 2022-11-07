import { ScrollView } from 'native-base';
import { useState } from 'react';
import ScrollingMenuItem from '../ScrollingMenuItem/ScrollingMenuItem';

export interface MenuItem {
  name: string;
}

export type ScrollingMenuItems<T> = Record<keyof T, MenuItem>;

interface ScrollingMenuProps<T> {
  items: ScrollingMenuItems<T>;
  selectedKey: keyof T | null;
  onChange?: (itemKey: keyof T) => void;
}

function ScrollingMenu<T>({
  items,
  selectedKey,
  onChange,
}: ScrollingMenuProps<T>) {
  return (
    <ScrollView horizontal={true}>
      {Object.keys(items).map((itemKey) => (
        <ScrollingMenuItem
          key={itemKey}
          item={items[itemKey as keyof T]}
          onPress={() => onChange?.(itemKey as keyof T)}
          selected={selectedKey === itemKey}
        ></ScrollingMenuItem>
      ))}
    </ScrollView>
  );
}

export default ScrollingMenu;

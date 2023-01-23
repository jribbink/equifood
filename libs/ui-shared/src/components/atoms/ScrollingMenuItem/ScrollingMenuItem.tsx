import { Button, Text } from 'native-base';
import { GestureResponderEvent } from 'react-native';
import { MenuItem } from '../../molecules/ScrollingMenu/ScrollingMenu';

interface ScrollingMenuItemProps {
  item: MenuItem;
  selected: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

export function ScrollingMenuItem({
  item,
  selected,
  onPress,
}: ScrollingMenuItemProps) {
  return (
    <Button onPress={onPress}>
      <Text>{item.name}</Text>
    </Button>
  );
}

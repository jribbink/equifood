import { Button, Text } from 'native-base';
import { GestureResponderEvent } from 'react-native';
import { MenuItem } from '../ScrollingMenu/ScrollingMenu';

interface ScrollingMenuItemProps {
  item: MenuItem;
  selected: boolean;
  onPress?: ((event: GestureResponderEvent) => void) | null;
}

function ScrollingMenuItem({
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

export default ScrollingMenuItem;

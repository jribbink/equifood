import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack, Text } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface NewItemButtonProps {
  onPress?: () => void;
}

function NewItemButton({ onPress }: NewItemButtonProps) {
  return (
    <TouchableOpacity style={{ borderRadius: 5 }} onPress={onPress}>
      <HStack
        background="primary.500"
        alignItems="center"
        space="2"
        px="5"
        py="4"
        borderRadius="md"
        justifyContent="center"
      >
        <Ionicons name="create-outline" size={40} />
        <Text fontSize={30}>New Item</Text>
      </HStack>
    </TouchableOpacity>
  );
}

export { NewItemButton };

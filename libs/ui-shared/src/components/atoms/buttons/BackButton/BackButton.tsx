import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, HStack, Text, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert, GestureResponderEvent } from 'react-native';

interface BackButtonProps {
  onPress?: ((event: GestureResponderEvent) => void) & (() => void);
  confirmationString: string | undefined;
}

export function BackButton({ onPress, confirmationString }: BackButtonProps) {
  const confirmThenBack = () => {
    Alert.alert('Back?', confirmationString, [
      {
        text: 'Confirm',
        onPress: onPress,
        style: 'default',
      },
      {
        text: 'Go Back',
        onPress: () => console.log('staying on merchant screen'),
        style: 'cancel',
      },
    ]);
  };
  const onPressHandler = confirmationString ? confirmThenBack : onPress;
  return (
    <TouchableOpacity onPress={onPressHandler}>
      <Box backgroundColor="green.500" p="3" px="4" rounded="full">
        <HStack space="2" alignItems="center">
          <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
          <Text>Back</Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}

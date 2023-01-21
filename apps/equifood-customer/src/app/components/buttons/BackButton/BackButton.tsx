import { StackActions } from '@react-navigation/native';
import { CoreStackParams } from '../../../layouts/CoreLayout/CoreNavigatorParams';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, HStack, Text, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert } from 'react-native';

function BackButton({
  navigation,
  confirmationString,
}: {
  navigation: NavigationProp<CoreStackParams>;
  confirmationString: string | undefined;
}) {
  const goBack = () => navigation.navigate('core', { screen: 'home' });
  const confirmThenBack = () => {
    Alert.alert('Back?', confirmationString, [
      {
        text: 'Confirm',
        onPress: goBack,
        style: 'default',
      },
      {
        text: 'Go Back',
        onPress: () => console.log('staying on merchant screen'),
        style: 'cancel',
      },
    ]);
  };
  const onPress = confirmationString ? confirmThenBack : goBack;
  return (
    <TouchableOpacity onPress={onPress}>
      <Box backgroundColor="green.500" p="3" px="4" rounded="full">
        <HStack space="2" alignItems="center">
          <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
          <Text>Back</Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}

export default BackButton;

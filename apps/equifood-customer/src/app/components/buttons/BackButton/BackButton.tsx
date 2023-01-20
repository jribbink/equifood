import { StackActions } from '@react-navigation/native';
import { CoreStackParams } from '../../../layouts/CoreLayout/CoreNavigatorParams';
import { NavigationProp } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, HStack, Text, VStack } from 'native-base';
import Ionicons from '@expo/vector-icons/Ionicons';

function BackButton({
  navigation,
}: {
  navigation: NavigationProp<CoreStackParams>;
}) {
  return (
    <TouchableOpacity onPress={() => navigation.dispatch(StackActions.pop(1))}>
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

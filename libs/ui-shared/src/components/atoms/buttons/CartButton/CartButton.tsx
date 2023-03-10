import { Box, HStack, Text, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useCart } from '../../../../hooks/useCart';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CoreStackParams } from '../../../layouts/CoreLayout/CoreNavigatorParams';
import { NavigationProp } from '@react-navigation/native';

export function CartButton({
  navigation,
}: {
  navigation: NavigationProp<CoreStackParams>;
}) {
  const cart = useCart();

  const total = cart.items.reduce(
    (total, { quantity, item }) => total + quantity * item.newPrice,
    0
  );

  return (
    <TouchableOpacity onPress={() => navigation.navigate('cart')}>
      <Box backgroundColor="green.500" p="3" px="4" rounded="full">
        <HStack space="2" alignItems="center">
          <Ionicons name="md-cart" size={32} color="black" />
          <VStack>
            <Text>{cart.items.length} Items</Text>
            <Text>${total.toFixed(2)}</Text>
          </VStack>
        </HStack>
      </Box>
    </TouchableOpacity>
  );
}

import { Item } from '@equifood/api-interfaces';
import { ItemCard, NewItemButton, useMerchant } from '@equifood/ui-shared';
import { HStack, VStack } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CoreNavigationProps } from '../../layouts/CoreLayout';

function MenuScreen({ navigation }: CoreNavigationProps<'menu'>) {
  const { merchant } = useMerchant('self');

  function handleItemPress(item: Item) {
    navigation.navigate('itemEditor', { item });
  }

  return (
    <VStack space="5">
      {(merchant?.items || []).map((item) => (
        <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
          <ItemCard key={item.id} item={item}></ItemCard>
        </TouchableOpacity>
      ))}

      <HStack justifyContent="center">
        <NewItemButton
          onPress={() => navigation.navigate('itemEditor')}
        ></NewItemButton>
      </HStack>
    </VStack>
  );
}

export default MenuScreen;

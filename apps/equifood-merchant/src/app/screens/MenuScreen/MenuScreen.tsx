import { Item } from '@equifood/api-interfaces';
import { ItemCard, NewItemButton, useMerchant } from '@equifood/ui-shared';
import { HStack, VStack } from 'native-base';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ItemEditorModal from '../ItemEditorScreen/ItemEditorScreen';

function MenuScreen() {
  const { merchant } = useMerchant('self');
  const [editItem, setEditItem] = useState<Item | null>(null);

  function handleItemPress(item: Item) {
    console.log(item);
  }

  return (
    <>
      <VStack space="5">
        {(merchant?.items || []).map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <ItemCard key={item.id} item={item}></ItemCard>
          </TouchableOpacity>
        ))}

        <HStack justifyContent="center">
          <NewItemButton onPress={() => setEditItem({})}></NewItemButton>
        </HStack>
      </VStack>
      <ItemEditorModal
        isOpen={!!editItem}
        onClose={() => setEditItem(null)}
      ></ItemEditorModal>
    </>
  );
}

export default MenuScreen;

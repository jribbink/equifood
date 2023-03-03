import { Item } from '@equifood/api-interfaces';
import { CurrencyInput } from '@equifood/ui-shared';
import { Ionicons } from '@expo/vector-icons';
import {
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Text,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import { useState } from 'react';
import { RootNavigationProps } from '../../layouts/RootLayout';

function ItemEditorScreen({ route }: RootNavigationProps<'itemEditor'>) {
  const [item, setItem] = useState<Partial<Item>>(
    route.params?.item ?? {
      quantity: 1,
    }
  );

  function currencyToString(value: number | undefined) {
    return `$${(value ?? 0).toFixed(2)}`;
  }

  return (
    <ScrollView overflow="visible" backgroundColor="white">
      <VStack space="3">
        <FormControl isInvalid maxW="300px" alignSelf="center">
          <FormControl.Label>Item Name</FormControl.Label>
          <Input
            value={item.name}
            onChangeText={(v) => setItem({ ...item, name: v })}
            placeholder="Item name"
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            Try different from previous passwords.
          </FormControl.ErrorMessage>

          <FormControl.Label>Original Price</FormControl.Label>
          <CurrencyInput
            value={item.originalPrice}
            onChangeValue={(v) => setItem({ ...item, originalPrice: v })}
            placeholder="Original Price"
            keyboardType="numeric"
          />

          <FormControl.Label>Discounted Price</FormControl.Label>
          <Input placeholder="Discounted Price" keyboardType="numeric" />

          <FormControl.Label>Description</FormControl.Label>
          <Input placeholder="Description" />

          <FormControl.Label>Stock</FormControl.Label>
          <Input placeholder="Stock" />
        </FormControl>

        <HStack alignSelf="center" space="2">
          <Button
            background="danger.500"
            leftIcon={
              <Ionicons size={20} name="trash" color="white"></Ionicons>
            }
          >
            Delete Item
          </Button>
          <Button
            background="success.500"
            leftIcon={<Ionicons size={20} name="save" color="white"></Ionicons>}
          >
            Save Item
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

export default ItemEditorScreen;

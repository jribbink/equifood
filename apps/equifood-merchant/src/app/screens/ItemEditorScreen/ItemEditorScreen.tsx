import { Item } from '@equifood/api-interfaces';
import { CurrencyInput, useAxios, ValidationInput } from '@equifood/ui-shared';
import { Ionicons } from '@expo/vector-icons';
import {
  EventListenerCallback,
  EventMapCore,
  StackNavigationState,
} from '@react-navigation/native';
import { StackNavigationEventMap } from '@react-navigation/stack';
import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  ScrollView,
  Spacer,
  Text,
  TextArea,
  VStack,
} from 'native-base';
import { useEffect, useState } from 'react';
import {
  RootNavigationParams,
  RootNavigationProps,
} from '../../layouts/RootLayout';
import _ from 'lodash';
import { Alert } from 'react-native';

function ItemEditorScreen({
  route,
  navigation,
}: RootNavigationProps<'itemEditor'>) {
  const axios = useAxios();
  const [item, setItem] = useState<Partial<Item>>(
    route.params?.item ?? {
      quantity: 1,
    }
  );
  const [errors, setErrors] = useState({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(!_.isEqual(item, route.params?.item));
  }, [item, route]);

  useEffect(() => {
    let errors = {};
    if (!item.name) {
      errors = { ...errors, name: 'Name is required' };
    }
    setErrors(errors);
  }, [item]);

  useEffect(() => {
    navigation.setOptions({
      title: item.id ? `Editing: ${item.name}` : 'Creating new item',
    });
  }, [navigation, item]);

  useEffect(() => {
    const beforeRemoveListener: EventListenerCallback<
      StackNavigationEventMap &
        EventMapCore<StackNavigationState<RootNavigationParams>>,
      'beforeRemove'
    > = (e) => {
      if (hasChanges) {
        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'Are you sure you want to discard your changes?',
          [
            {
              text: "I'm Sure",
              onPress: () => navigation.dispatch(e.data.action),
              style: 'default',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]
        );
      }
    };

    navigation.addListener('beforeRemove', beforeRemoveListener);
    return () =>
      navigation.removeListener('beforeRemove', beforeRemoveListener);
  }, [navigation, hasChanges]);

  function handleSaveItem() {
    axios.post('/');

    navigation.navigate('core', { screen: 'menu' });
  }

  return (
    <ScrollView overflow="visible" backgroundColor="white" padding="4">
      <VStack space="6">
        <FormControl maxW="300px" alignSelf="center">
          <VStack space="2">
            <Box>
              <FormControl.Label fontSize={40} _text={{ fontSize: 'md' }}>
                Item Name
              </FormControl.Label>
              <Input
                value={item.name}
                onChangeText={(v) => setItem({ ...item, name: v })}
                placeholder="Item name"
                size="2xl"
                isInvalid={'name' in errors}
                outlineColor="red"
              />
              {'name' in errors ? (
                <Text color="red.500" pt="2" fontWeight="bold" fontSize="md">
                  Item requires a name
                </Text>
              ) : null}
            </Box>

            <Box>
              <FormControl.Label _text={{ fontSize: 'md' }}>
                Original Price
              </FormControl.Label>
              <CurrencyInput
                value={item.originalPrice}
                onChangeValue={(v) => setItem({ ...item, originalPrice: v })}
                placeholder="Original Price"
                size="2xl"
              />
            </Box>

            <Box>
              <FormControl.Label _text={{ fontSize: 'md' }}>
                Discounted Price
              </FormControl.Label>
              <CurrencyInput
                value={item.price}
                onChangeValue={(v) => setItem({ ...item, price: v })}
                placeholder="Discounted Price"
                size="2xl"
              />
              <FormControl.ErrorMessage>
                A discounted price cannot be lesser than an original price
              </FormControl.ErrorMessage>
            </Box>

            <Box>
              <FormControl.Label _text={{ fontSize: 'md' }}>
                Description
              </FormControl.Label>
              <TextArea
                autoCompleteType={true}
                placeholder="Description"
                size="2xl"
              ></TextArea>
            </Box>

            <Box>
              <FormControl.Label _text={{ fontSize: 'md' }}>
                Stock
              </FormControl.Label>
              <ValidationInput
                value={String(item.quantity) ?? '0'}
                onChangeText={(v) =>
                  setItem({ ...item, quantity: parseInt(v) })
                }
                placeholder="Stock"
                regex={/^\d*$/}
                defaultValue="0"
                size="2xl"
              />
            </Box>
          </VStack>
        </FormControl>

        <HStack alignSelf="center" space="2">
          <Button
            background="danger.500"
            leftIcon={
              <Ionicons
                size={20}
                name={item.id ? 'trash' : 'arrow-undo'}
                color="white"
              ></Ionicons>
            }
            size="lg"
          >
            {item.id ? `Delete Item` : 'Discard Item'}
          </Button>
          <Button
            background="success.500"
            leftIcon={<Ionicons size={20} name="save" color="white"></Ionicons>}
            size="lg"
            isDisabled={!hasChanges}
            onPress={handleSaveItem}
          >
            Save Item
          </Button>
        </HStack>
      </VStack>
    </ScrollView>
  );
}

export default ItemEditorScreen;

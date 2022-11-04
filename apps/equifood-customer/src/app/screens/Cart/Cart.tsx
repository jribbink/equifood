import React, { useRef, useState } from 'react';
import { VStack, ScrollView, Text, Button, View, Box } from 'native-base';
import { Item, Merchant } from '@equifood/api-interfaces';

const Cart = () => {
  const [merchant] = useState<Merchant>({
    id: '1',
    name: 'Test',
    address: '1234 st',
    banner_url: 'https://example.com/foo.png',
  });

  const [items, setItems] = useState<Item[]>([
    {
      id: '1',
      name: 'Burger',
      newPrice: 3.99,
      oldPrice: 4.99,
    },
    {
      id: '2',
      name: 'Drink',
      newPrice: 3.99,
      oldPrice: 4.99,
    },
    {
      id: '3',
      name: 'Hot Dog',
      newPrice: 3.99,
      oldPrice: 4.99,
    },
  ]);

  const removeItem = (id:string) => {
    setItems(current =>
      current.filter(items => {
        return items.id !== id;
      }),
    );
  };

  let totalPrice = 0;
  items.forEach((item) => {
    totalPrice += item.newPrice;
  });

  return (
    <ScrollView>
      <Text
        testid="restaurant"
        fontWeight="bold"
        fontSize="24"
        alignSelf="center"
        padding={3}
      >
        {merchant.name}
      </Text>
      <VStack paddingBottom={5}>
        {items.map((item) => (
          <View testID="CartItem" key={item.id} alignSelf="stretch" style={{
            flexDirection: "row",
            height: 60,
            padding: 10
          }}>
            <View style={{flex: 1 }}>
              <Text testID="item-name">
                {item.name}
              </Text>
            </View>
            <View style={{flex: 1 }}>
              <Text testID="item-newPrice" fontWeight={'bold'}>
                {item.newPrice}
              </Text>
              <Text testID="item-oldPrice" textDecorationLine={'line-through'}>
                {item.oldPrice}
              </Text>
            </View>
            <View style={{flex: 1 }}>
              <Button
                  style={{backgroundColor:"red", borderRadius:30}}
                  accessibilityLabel="Remove item from cart"
                  onPress={()=>removeItem(item.id)}
                >Remove</Button>
              </View>
          </View>
        ))}
      </VStack>
      <Text testid="totalPrice" fontSize="20" alignSelf="center" padding="3">
        Total Price: {totalPrice}$
      </Text>
      <Text testid="address" fontSize="20" alignSelf="center" padding="3">
        Address: {merchant.address}
      </Text>
      <Text testid="pickup" fontSize="20" alignSelf="center" padding="3">
        PickupTime: now-15 min
      </Text>
      <Button
        style={{ backgroundColor: 'cyan', borderRadius: 30 }}
        padding="3"
        accessibilityLabel="Confirm Order"
        onPress={() => alert('checkout')}
      >
        <Text fontSize="24" fontWeight="bold">
          Confirm
        </Text>
      </Button>
    </ScrollView>
  );
};

export default Cart;

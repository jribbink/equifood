import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  Text,
  ScrollView,
  VStack,
  Image,
  Heading,
  HStack,
} from 'native-base';
import { StyleSheet } from 'react-native';
import { Order, Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useAxios } from '../../hooks/useAxios';
import ItemCard from '../../components/cards/ItemCard/ItemCard';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const axios = useAxios();
  const { merchant } = useMerchant(route.params.merchant.id);
  const [quantityMap, setQuantityMap] = useState<{ [itemId: string]: number }>(
    {}
  );

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  if (!merchant) return null;

  const items = merchant.items;

  return (
    <Box height="full">
      <ScrollView testID="view" flex={1}>
        <Box h="200">
          <Image
            width="100%"
            height="200"
            source={{
              uri: merchant.banner_url,
            }}
            alt={merchant.name}
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            borderTopRadius="5"
          />
          <Box flex={1} justifyContent="flex-end" p="1.5">
            <Image
              source={{ uri: merchant.logo_url }}
              alt={merchant.name}
              backgroundColor="white"
              borderRadius="full"
              width="16"
              height="16"
            ></Image>
          </Box>
        </Box>
        <VStack space="4" m="4">
          <Box borderRadius="5" testID="desc" shadow="2">
            <HStack
              bgColor="white"
              borderBottomRadius={5}
              shadow="5"
              p="1.5"
              space="2"
            >
              <Text>
                <Heading testID="merchant-name" fontSize="lg" fontWeight="bold">
                  {merchant.name}
                </Heading>
                <Text>
                  {'\nDescription: ' +
                    merchant.description +
                    '\nAddress:\n' +
                    merchant.location.address +
                    '\nPick up by:\n' +
                    merchant.deadline?.toLocaleDateString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit',
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                </Text>
              </Text>
            </HStack>
          </Box>
          {(items || []).map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              quantity={quantityMap[item.id] ?? 0}
              onQuantityChange={(newQuantity) =>
                setQuantityMap((currentValue) => ({
                  ...currentValue,
                  [item.id]: newQuantity,
                }))
              }
            ></ItemCard>
          ))}
          <Box borderRadius="5" testID="desc" shadow="2">
            <HStack
              bgColor="white"
              borderBottomRadius={5}
              shadow="5"
              p="1.5"
              space="2"
            >
              <Text>
                <Heading testID="reviews" fontSize="lg" fontWeight="bold">
                  Reviews:
                </Heading>
              </Text>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
      <Button
        onPress={async () => {
          // check if all values are 0
          if (Object.entries(quantityMap).every((item) => item[1] === 0)) {
            alert('Please choose at least one item before continuing.');
          } else {
            navigation.navigate('orderConfirm', {
              merchant: merchant,
              items: items,
              /*quantities: Object.entries(quantityMap).map(([id, quantity]) => ({
                [id]: quantity
              })),*/
              quantities: quantityMap,
            });
          }
        }}
      >
        Order
      </Button>
    </Box>
  );
}

export default RestaurantScreen;

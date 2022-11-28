import { StackScreenProps } from '@react-navigation/stack';
import {
  Box,
  Button,
  Text,
  ScrollView,
  VStack,
  Image,
  View,
  Heading,
  HStack,
  useDisclose,
} from 'native-base';
import { TouchableHighlight } from 'react-native';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import * as expoLocation from 'expo-location';
import ActionSheet from '../../components/ActionSheet/ActionSheet';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const dispatch = useDispatch<AppDispatch>();
  const { merchant } = useMerchant(route.params.merchant.id);
  const { isOpen, onOpen, onClose } = useDisclose();

  if (!merchant) return null;

  const item = merchant.item;

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
                  {'\n' +
                    merchant.description +
                    '\nAddress: ' +
                    merchant.location.address +
                    '\nBy ' +
                    merchant.deadline}
                </Text>
              </Text>
            </HStack>
          </Box>
          <Box borderRadius="5" testID="desc" shadow="2">
            <HStack
              bgColor="white"
              borderBottomRadius={5}
              shadow="5"
              p="1.5"
              space="2"
            >
              <Text>
                <Heading testID="item-name" fontSize="lg" fontWeight="bold">
                  {item.name}
                </Heading>
                <Heading testID="newPrice" fontSize="md">
                  {'\nnew price: '}
                </Heading>
                {' ' + item.price}
                <Text testID="originalPrice" fontWeight="italic" fontSize="sm">
                  {'\nold price: ' + item.originalPrice}
                </Text>
              </Text>
            </HStack>
          </Box>
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
        <Button onPress={() => alert('checkout')}>Order</Button>
      </ScrollView>
      <ActionSheet isOpen={isOpen} onClose={onClose}>
        <Text style={{ textAlign: 'center' }}>Number to order:</Text>
        {
          // # input
          // change onPress to dispatch order / add to orders page
          <Button
            style={{ backgroundColor: 'cyan', borderRadius: 30 }}
            padding="3"
            accessibilityLabel="Confirm Order"
            onPress={() => alert('checkout')}
          ></Button>
        }
      </ActionSheet>
    </Box>
  );
}

export default RestaurantScreen;

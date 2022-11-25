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
} from 'native-base';
import { TouchableHighlight } from 'react-native';
import { Merchant } from '@equifood/api-interfaces';
import { CoreStackParams } from '../../layouts/CoreLayout/CoreNavigatorParams';
import React, { useState } from 'react';
import { useMerchant } from '../../hooks/useMerchant';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

export interface MerchantScreenParams {
  merchant: Merchant;
}

function RestaurantScreen({
  navigation,
  route,
}: StackScreenProps<CoreStackParams, 'merchant'>) {
  const dispatch = useDispatch<AppDispatch>();
  const { merchant } = useMerchant(route.params.merchant.id);

  if (!merchant) return null;

  const item = merchant.item;

  return (
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
                  '\n' +
                  merchant.location +
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
              <Heading testID="merchant-name" fontSize="lg" fontWeight="bold">
                {item.name}
              </Heading>
              <Heading testID="price" fontSize="md">
                {item.newPrice}
              </Heading>
              <Text fontWeight="italic" fontSize="sm">
                {item.oldPrice}
              </Text>
            </Text>
          </HStack>
        </Box>
      </VStack>
      <Button onPress={() => alert('checkout')}>hello</Button>
    </ScrollView>
  );
}

export default RestaurantScreen;

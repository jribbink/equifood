import React, { useRef, useState } from 'react';

import { VStack, ScrollView, Text, Box, Button } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth-slice';

const Account = () => {
  const dispatch = useDispatch();
  function logoutUser() {
    console.log('logout');
    dispatch(logout());
  }

  return (
    <Box>
      <Button onPress={logoutUser}>
        <Text>Logout</Text>
      </Button>
    </Box>
  );
};

export default Account;

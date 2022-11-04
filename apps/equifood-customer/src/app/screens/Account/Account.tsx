import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth-slice';
import { StyleSheet, Button, View, SafeAreaView, Alert } from 'react-native';
import { VStack, ScrollView, Text } from 'native-base';
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';
import { Divider } from 'native-base';

const Account = () => {

  function logoutUser() {
    console.log('logout');
    dispatch(logout());
  }

  return (
    <ScrollView>
      <Text style={{fontWeight: 'bold', marginTop:20, fontSize:40, padding:20, textAlign:"center"}} >
        Account
      </Text>
      <Divider my={10} />
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20, color:"gray"}} >
        Name:
      </Text>
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20}} >
        User full name here
      </Text>
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20, color:"gray"}} >
        Email:
      </Text>
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20}} >
        User email here
      </Text>
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20, color:"gray"}} >
        Phone:
      </Text>
      <Text style={{fontWeight: 'bold', marginTop:5, fontSize:20, padding:20}} >
        User phone number here
      </Text>
      <View style={[{ width: "70%", margin: 60, backgroundColor: "blue" }]}>
          <Button
            title="Log out"
            color="cyan"
            onPress={logoutUser}
          />
      </View>
    </ScrollView>
  );
};

export default Account;

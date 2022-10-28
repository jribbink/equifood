import React, { useRef, useState } from 'react';

import { VStack, ScrollView } from 'native-base';
import { Button, Text, View, SafeAreaView, StyleSheet, TextInput } from "react-native";
import MerchantCard from '../../components/cards/MerchantCard/MerchantCard';
import { Merchant } from '@equifood/api-interfaces';
import { authenticate} from '../../redux/slices/auth-slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [merchants, setMerchants] = useState<Merchant[]>([
    {
      id: '1',
      name: 'L',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '2',
      name: 'O',
      banner_url: 'https://example.com/foo.png',
    },
    {
      id: '3',
      name: 'G',
      banner_url: 'https://example.com/foo.png',
    },
  ]);

  const [un, onChangeUsername] = useState("");
  const [pw, onChangePassword] = useState("");

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <ScrollView>
      <VStack space={3} paddingX={2} marginBottom={10}>
        {merchants.map((merchant) => (
          <MerchantCard merchant={merchant} key={merchant.id}></MerchantCard>
        ))}
      </VStack>
      <SafeAreaView>
        <Text style={{padding: 10, fontSize: 24}}>
          Username
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={un}
        />
        <Text style={{padding: 10, fontSize: 24}}>
          Password
        </Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangePassword}
          value={pw}
        />
      </SafeAreaView>

      <Button title="Login" onPress={() => (dispatch(authenticate(un, pw)))} color="#841584" accessibilityLabel="Learn more about this purple button" />
      
    </ScrollView>
  );
};

export default Login;

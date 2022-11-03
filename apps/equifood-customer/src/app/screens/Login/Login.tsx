import React, { useEffect, useState } from 'react';

import { ScrollView } from 'native-base';
import {
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { authenticate } from '../../redux/slices/auth-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { useIsFocused } from '@react-navigation/native';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  const isFocused = useIsFocused();

  return (
    <ScrollView testID={isFocused ? 'login-screen' : undefined}>
      <Text style={{ padding: 10, fontSize: 24 }}>Login</Text>
      <SafeAreaView>
        <Text testID="login" style={{ padding: 10, fontSize: 24 }}>
          Login
        </Text>
        <TextInput style={styles.input} onChangeText={setEmail} value={email} />
        <Text style={{ padding: 10, fontSize: 24 }}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
        />
      </SafeAreaView>

      <Button
        title="Login"
        onPress={() => {
          dispatch(authenticate({ email, password }));
        }}
        color="#841584"
      />
    </ScrollView>
  );
};

export default Login;

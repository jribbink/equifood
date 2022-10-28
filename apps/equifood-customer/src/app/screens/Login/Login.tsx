import React, {  useState } from 'react';

import { ScrollView } from 'native-base';
import { Button, Text, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { authenticate} from '../../redux/slices/auth-slice';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useStore<RootState>();

  const [email, onChangeUsername] = useState("");
  const [pw, onChangePassword] = useState("");

  const jwt = useSelector<RootState, string>(
    () => store.getState().auth.jwt
  );

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  return (
    <ScrollView style={{justifyContent: "center"}}>
      <Text style={{padding: 10, fontSize: 24}}>
        Login
      </Text>
      <SafeAreaView>
        <Text style={{padding: 10, fontSize: 24}}>
          Login
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeUsername}
          value={email}
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

      <Button title="Login" onPress={() => {dispatch(authenticate({email, pw}))}} color="#841584" />
      
    </ScrollView>
  );
};

export default Login;

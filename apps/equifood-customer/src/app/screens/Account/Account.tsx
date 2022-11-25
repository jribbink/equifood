import React from 'react';
import { Text, Button, ScrollView, Divider, View } from 'native-base';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth-slice';
import { useProfile } from '../../hooks/useProfile';

const Account = () => {
  const { User } = useProfile();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }

  return (
    <ScrollView>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 20,
          fontSize: 40,
          padding: 20,
          textAlign: 'center',
        }}
      >
        Account
      </Text>
      <Divider my={10} />
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 5,
          fontSize: 20,
          padding: 20,
          color: 'gray',
        }}
      >
        Name:
      </Text>
      <Text
        style={{ fontWeight: 'bold', marginTop: 5, fontSize: 20, padding: 20 }}
      >
        <User className="email"></User>
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 5,
          fontSize: 20,
          padding: 20,
          color: 'gray',
        }}
      >
        Email:
      </Text>
      <Text
        style={{ fontWeight: 'bold', marginTop: 5, fontSize: 20, padding: 20 }}
      >
        User email here
      </Text>
      <Text
        style={{
          fontWeight: 'bold',
          marginTop: 5,
          fontSize: 20,
          padding: 20,
          color: 'gray',
        }}
      >
        Phone:
      </Text>
      <Text
        style={{ fontWeight: 'bold', marginTop: 5, fontSize: 20, padding: 20 }}
      >
        User phone number here
      </Text>
      <View style={[{ width: '70%', margin: 60, backgroundColor: 'blue' }]}>
        <Button color="cyan" onPress={logoutUser}>
          <Text>Logout</Text>
        </Button>
      </View>
    </ScrollView>
  );
};

export default Account;

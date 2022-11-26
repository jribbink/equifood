import React from 'react';
import {
  Text,
  Button,
  ScrollView,
  Divider,
  View,
  Flex,
  HStack,
  Center,
} from 'native-base';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth-slice';
import { useProfile } from '../../hooks/useProfile';

const Account = () => {
  const { user } = useProfile();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }
  if (!user) {
    return;
  }
  return (
    <ScrollView>
      <View
        style={{
          marginTop: 10,
          width: '90%',
          alignSelf: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 20,
            fontSize: 30,
            padding: 10,
            color: 'darkgreen',
          }}
        >
          {` `}
          {user.first_name} {user.last_name}
        </Text>
        <Text
          style={{
            paddingLeft: 20,
            fontWeight: 'bold',
            color: 'gray',
          }}
        >
          {user.phone}
        </Text>
        <Text
          style={{
            fontWeight: 'bold',
            marginTop: 5,
            fontSize: 15,
            padding: 20,
            color: 'black',
          }}
        >
          {user.email}
        </Text>
      </View>

      <Button
        style={{
          borderRadius: 20,
          width: '90%',
          marginTop: 30,
          alignSelf: 'center',
        }}
        color="darkgreen"
        onPress={logoutUser}
      >
        <Text>Logout</Text>
      </Button>
    </ScrollView>
  );
};

export default Account;

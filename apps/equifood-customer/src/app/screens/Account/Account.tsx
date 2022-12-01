import React from 'react';
import { Text, Button, ScrollView, View, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/auth-slice';
import { useProfile } from '../../hooks/useProfile';
import ProfileCard from '../../components/cards/ProfileCard/ProfileCard';
import SocialCard from '../../components/cards/SocialCard/SocialCard';

const Account = () => {
  const { user } = useProfile();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }

  return (
    <ScrollView p="3">
      <VStack space="3">
        {user ? <ProfileCard user={user}></ProfileCard> : null}
        <SocialCard></SocialCard>

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
      </VStack>
    </ScrollView>
  );
};

export default Account;

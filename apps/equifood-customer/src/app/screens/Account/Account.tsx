import React from 'react';
import { Text, Button, ScrollView, Box, VStack } from 'native-base';
import { useDispatch } from 'react-redux';
import { logout } from '@equifood/ui-shared';
import {
  ProfileCard,
  SocialCard,
  useProfile,
  useSavings,
} from '@equifood/ui-shared';

const Account = () => {
  const { user } = useProfile();
  const { savings } = useSavings();
  const dispatch = useDispatch();
  function logoutUser() {
    dispatch(logout());
  }

  return (
    <ScrollView p="3">
      <VStack space="3">
        {user ? <ProfileCard user={user}></ProfileCard> : null}
        {savings ? (
          <Box style={{ marginTop: 5 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                padding: 20,
                color: 'black',
              }}
            >
              Total Money Saved:{' '}
              <Text
                style={{
                  color: 'green',
                }}
              >
                ${savings}
              </Text>
            </Text>
          </Box>
        ) : null}
        <SocialCard></SocialCard>

        <Button
          style={{
            borderRadius: 20,
            width: '90%',
            marginTop: 30,
            alignSelf: 'center',
            backgroundColor: 'forestgreen',
          }}
          onPress={logoutUser}
        >
          <Text>Logout</Text>
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Account;

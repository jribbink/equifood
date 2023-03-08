import React from 'react';
import { Text, Button, ScrollView, Box, VStack } from 'native-base';
import {
  ProfileCard,
  SocialCard,
  useAuth,
  useProfile,
  useSavings,
  equifoodTheme,
} from '@equifood/ui-shared';

const Account = () => {
  const { user } = useProfile();
  const { savings } = useSavings();
  const { setJwt } = useAuth();

  function logoutUser() {
    setJwt(null);
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
                  color: equifoodTheme.colors.primary[600],
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
            width: '100%',
            borderRadius: 20,
            marginTop: 30,
            alignSelf: 'center',
            backgroundColor: equifoodTheme.colors.primary[500],
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

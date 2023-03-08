import { useAuth } from '@equifood/ui-shared';
import { Button, VStack } from 'native-base';

function AccountScreen() {
  const { setJwt } = useAuth();

  return (
    <VStack>
      <Button onPress={() => setJwt(null)}>Logout</Button>
    </VStack>
  );
}

export default AccountScreen;

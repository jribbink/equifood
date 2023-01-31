import { LoginView } from '@equifood/ui-shared';
import { Box } from 'native-base';

function LoginScreen() {
  return (
    <Box>
      <LoginView allowedRoles={['merchant']}></LoginView>
    </Box>
  );
}

export default LoginScreen;

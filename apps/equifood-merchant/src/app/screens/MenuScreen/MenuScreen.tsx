import { useMerchant } from '@equifood/ui-shared';
import { Box } from 'native-base';

function MenuScreen() {
  const { merchant } = useMerchant('self');
  console.log(merchant);
  return (
    <Box>
      {merchant?.items.map((item) => (
        <Box>{item.name}</Box>
      ))}
    </Box>
  );
}

export default MenuScreen;

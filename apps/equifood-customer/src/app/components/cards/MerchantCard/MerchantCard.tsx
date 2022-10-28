import { Box, Text } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';

interface Props {
  merchant: Merchant;
}

const RestuarantCard = ({ merchant }: Props) => {
  return (
    <Box testID="merchant-card" alignSelf="stretch" bg="primary.500">
      <Text alignSelf="center" testID="merchant-name">
        {merchant.name}
      </Text>
    </Box>
  );
};

export default RestuarantCard;

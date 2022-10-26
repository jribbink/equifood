import { Box, Text } from 'native-base';
import { Merchant } from '@equifood/api-interfaces';

interface Props {
  merchant: Merchant;
}

const RestuarantCard = ({ merchant }: Props) => {
  return (
    <Box alignSelf="stretch" bg="primary.500">
      <Text alignSelf="center">{merchant.name}</Text>
    </Box>
  );
};

export default RestuarantCard;

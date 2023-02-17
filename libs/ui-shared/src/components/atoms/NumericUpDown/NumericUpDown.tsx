import { Box, Button, Text } from 'native-base';

interface NumericUpDownProps {
  value: number;
  onValueChange?: (value: number) => void;
  maxValue?: number;
  minValue?: number;
}

export function NumericUpDown({
  value,
  onValueChange,
  maxValue = Infinity,
  minValue = -Infinity,
}: NumericUpDownProps) {
  return (
    <Box flexDirection="column">
      <Box justifyContent="center" alignItems="center">
        <Button
          minWidth={'20'}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'green',
            borderRadius: 5,
          }}
          onPress={() => onValueChange(Math.min(value + 1, maxValue))}
        >
          <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
            +
          </Text>
        </Button>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text fontSize="20">{value}</Text>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          minWidth={'20'}
          style={{
            backgroundColor: 'green',
            borderRadius: 5,
          }}
          onPress={() => onValueChange(Math.max(value - 1, minValue))}
        >
          <Text fontWeight={'bold'} fontSize={'15'} color={'white'}>
            -
          </Text>
        </Button>
      </Box>
    </Box>
  );
}

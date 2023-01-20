import { Box, Button, Text } from 'native-base';

interface NumericUpDownProps {
  value: number;
  onValueChange: (value: number) => void;
  maxValue?: number;
  minValue?: number;
}

function NumericUpDown({
  value,
  onValueChange,
  maxValue = Infinity,
  minValue = -Infinity,
}: NumericUpDownProps) {
  return (
    <Box flexDirection="row">
      <Box justifyContent="center" alignItems="center">
        <Button
          style={{
            backgroundColor: 'blue',
            borderRadius: 30,
          }}
          onPress={() => onValueChange(Math.max(value - 1, minValue))}
        >
          -
        </Button>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>{value}</Text>
      </Box>
      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
            borderRadius: 30,
          }}
          onPress={() => onValueChange(Math.min(value + 1, maxValue))}
        >
          +
        </Button>
      </Box>
    </Box>
  );
}

export default NumericUpDown;

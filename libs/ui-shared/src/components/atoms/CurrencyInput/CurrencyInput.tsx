import { IInputProps, Input } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

interface CurrencyInputProps extends Omit<IInputProps, 'value'> {
  value: number | undefined;
  onChangeValue: (value: number) => void;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function CurrencyInput({
  onChangeValue,
  value: _value,
  ...props
}: CurrencyInputProps) {
  const [text, setText] = useState<string>('');

  const handleChangeValue = useCallback(
    (val: number) => {
      if (val !== _value) onChangeValue(val);

      const stringified = formatter.format(val);
      setText(stringified);
    },
    [onChangeValue, _value]
  );

  const handleChangeText = useCallback(
    (val: string) => {
      const stripped = val.replace(/[^(0-9)]/, '');
      const numeric = parseFloat(stripped);
      handleChangeValue(numeric);
    },
    [handleChangeValue]
  );

  useEffect(() => {
    handleChangeValue(_value ?? 0);
  }, [handleChangeValue, _value]);

  return (
    <Input
      value={text}
      onChangeText={(text) => {
        handleChangeText(text);
      }}
      {...props}
    ></Input>
  );
}

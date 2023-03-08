import { IInputProps, Input } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

interface ValidationInputProps extends IInputProps {
  regex: string | RegExp;
  value: string;
  onChangeText: (text: string) => void;
  defaultValue?: string;
}

export function ValidationInput({
  onChangeText,
  value,
  regex: _regex,
  defaultValue = '',
  ...props
}: ValidationInputProps) {
  const [regex, setRegex] = useState<RegExp>(new RegExp(_regex));
  useEffect(() => {
    setRegex(new RegExp(_regex));
  }, [_regex]);

  const handleChangeText = useCallback(
    (val: string) => {
      if (val.match(regex)) {
        const newValue = val && val !== '' ? val : defaultValue;
        if (newValue !== value) onChangeText(newValue);
      }
    },
    [regex, onChangeText, value, defaultValue]
  );

  useEffect(() => {
    handleChangeText(value);
  }, [handleChangeText, value]);

  return (
    <Input
      value={value}
      onChangeText={(text) => handleChangeText(text)}
      {...props}
    ></Input>
  );
}

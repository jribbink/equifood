import { IInputProps, Input } from 'native-base';
import { useCallback, useEffect, useState } from 'react';

interface ValidationInputProps extends IInputProps {
  regex: string | RegExp;
  value: string;
  onChangeText: (text: string) => void;
}

export function ValidationInput({
  onChangeText,
  value,
  regex: _regex,
  ...props
}: ValidationInputProps) {
  const [regex, setRegex] = useState<RegExp>(new RegExp(_regex));
  useEffect(() => {
    setRegex(new RegExp(_regex));
  }, [_regex]);

  const [_value, _setValue] = useState<string>();

  const handleChangeText = useCallback(
    (val: string) => {
      if (val.match(regex)) {
        _setValue(value);
      } else {
        onChangeText(_value ?? '');
      }
    },
    [value, regex, onChangeText, _value]
  );

  useEffect(() => {
    handleChangeText(value);
  }, [handleChangeText, value]);

  return (
    <Input
      value={value}
      onChangeText={(text) => {
        handleChangeText(text);
      }}
      {...props}
    ></Input>
  );
}

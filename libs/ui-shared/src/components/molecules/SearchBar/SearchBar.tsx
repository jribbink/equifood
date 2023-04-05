import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack, Icon, Input, Text } from 'native-base';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value: string;
}

export function SearchBar({
  onFocus,
  onBlur,
  onChangeText,
  value,
}: SearchBarProps) {
  function handleBlur() {
    inputRef.current?.blur();
    onBlur?.();
  }

  const inputRef = useRef<TextInput | null>(null);

  return (
    <HStack space={2}>
      <Input
        flexGrow={1}
        variant="outline"
        onChangeText={onChangeText}
        onFocus={onFocus}
        placeholder="Search"
        value={value}
        testID="searchInput"
        autoCapitalize="none"
        ref={inputRef}
        InputLeftElement={
          <Icon
            ml="2"
            size="4"
            color="gray.400"
            as={<Ionicons name="ios-search" />}
          ></Icon>
        }
      />
      <TouchableOpacity onPress={handleBlur}>
        <Text>Cancel</Text>
      </TouchableOpacity>
    </HStack>
  );
}

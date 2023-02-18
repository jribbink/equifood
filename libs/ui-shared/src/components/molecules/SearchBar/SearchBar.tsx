import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  Spacer,
  Text,
  VStack,
} from 'native-base';
import { useRef } from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native';
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
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 50,
      flexGrow: 1,
    },
  });

  function handleBlur() {
    inputRef.current?.blur();
    onBlur?.();
  }

  const inputRef = useRef<TextInput | null>(null);

  return (
    <HStack space={2} pt="10">
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

import Ionicons from '@expo/vector-icons/Ionicons';
import { HStack, Icon, Input, Text } from 'native-base';
import { forwardRef, useRef } from 'react';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
  onChangeText?: (text: string) => void;
  value: string;
  ref: React.MutableRefObject<TextInput>;
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ onFocus, onBlur, onChangeText, value }, ref) => {
    function triggerBlur() {
      ((ref as any)?.current as TextInput)?.blur();
    }

    return (
      <HStack space={2}>
        <Input
          flexGrow={1}
          variant="outline"
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Search"
          value={value}
          testID="searchInput"
          autoCapitalize="none"
          ref={ref || undefined}
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="ios-search" />}
            ></Icon>
          }
        />
        <TouchableOpacity onPress={triggerBlur}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </HStack>
    );
  }
);

import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, HStack, Icon, Input, Text, View } from 'native-base';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native';
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

const AInput = Animated.createAnimatedComponent(Input);
const AButton = Animated.createAnimatedComponent(Button);
interface SearchBarProps {
  onChangeText?: (text: string) => void;
  onActiveChange?: (value: boolean) => void;
  value: string;
  ref: React.MutableRefObject<TextInput>;
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ onChangeText, onActiveChange, value }, ref) => {
    function triggerBlur() {
      ((ref as any)?.current as TextInput)?.blur();
    }

    const [active, setActive] = useState<boolean>(false);
    const _text = useRef<string>();

    useEffect(() => {
      onActiveChange?.(active);
    }, [onActiveChange, active]);

    function handleFocus() {
      setActive(true);
    }

    function handleBlur() {
      if (!_text.current) {
        setActive(false);
      }
    }

    function handleValueChange(text: string) {
      _text.current = text;
      onChangeText?.(text);
    }

    const [buttonWidth, setButtonWidth] = useState<number>(0);
    const transX = useSharedValue(0);

    useEffect(() => {
      if (active) {
        transX.value = withTiming(buttonWidth, { duration: 200 });
      } else {
        transX.value = withTiming(0, { duration: 200 });
      }
    }, [active, transX, buttonWidth]);

    /*const props = {
      input: useAnimatedProps<typeof AInput>(() => ({
        
      })),
      button: useAnimatedProps(() => ({

      }))
    }*/

    return (
      <HStack space={2}>
        <AInput
          flexGrow={1}
          variant="outline"
          onChangeText={handleValueChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
        <AButton
          onPress={triggerBlur}
          variant="unstyled"
          p="1"
          onLayout={(e) => setButtonWidth(e.nativeEvent.layout.width)}
        >
          <Text>Cancel</Text>
        </AButton>
      </HStack>
    );
  }
);

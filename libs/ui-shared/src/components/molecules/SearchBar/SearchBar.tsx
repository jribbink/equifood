import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, HStack, Icon, Input, Text, View } from 'native-base';
import {
  createRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextInput } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AInput = Animated.createAnimatedComponent(Input);
const AButton = Animated.createAnimatedComponent(Button);
interface SearchBarProps {
  onChangeText?: (text: string) => void;
  onActiveChange?: (value: boolean) => void;
  value: string;
  ref: React.RefObject<TextInput>;
}

export const SearchBar = forwardRef<TextInput, SearchBarProps>(
  ({ onChangeText, onActiveChange, value }, parentInputRef) => {
    const [active, setActive] = useState<boolean>(false);
    const inputRef = createRef<TextInput>();

    useEffect(() => {
      onActiveChange?.(active);
    }, [onActiveChange, active]);

    function handleFocus() {
      setActive(true);
    }

    function handleBlur() {
      setActive(false);
    }

    function handleValueChange(text: string) {
      onChangeText?.(text);
    }

    const [inputWidth, setInputWidth] = useState(0);
    const _inputWidth = useSharedValue(0);

    useEffect(() => {
      _inputWidth.value = inputWidth;
    }, [inputWidth, _inputWidth]);

    const transX = useSharedValue(0);
    const animationState = useSharedValue(0);

    useEffect(() => {
      if (!active && !value) {
        animationState.value = withTiming(0, { duration: 500 });
      } else {
        animationState.value = withTiming(1, { duration: 500 });
      }
    }, [active, transX, value, animationState]);

    const styles = {
      button: useAnimatedStyle(() => ({
        transform: [{ translateX: transX.value }],
        opacity: animationState.value,
      })),
      input: useAnimatedStyle(() => ({
        width: interpolate(
          animationState.value,
          [0, 1],
          [_inputWidth.value, 0]
        ),
        flexGrow: 1,
      })),
    };

    return (
      <HStack
        space={2}
        onLayout={(e) => setInputWidth(e.nativeEvent.layout.width)}
        flexGrow={1}
      >
        {inputWidth ? (
          <>
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
              autoCorrect={false}
              ref={(_ref) => {
                if (typeof parentInputRef === 'function') parentInputRef(_ref);
                else if (parentInputRef) parentInputRef.current = _ref;
                if (typeof inputRef === 'function') (inputRef as any)(_ref);
                else if (inputRef) (inputRef as any).current = _ref;
              }}
              InputLeftElement={
                <Icon
                  ml="2"
                  size="4"
                  color="gray.400"
                  as={<Ionicons name="ios-search" />}
                ></Icon>
              }
              style={styles.input}
            />
            <AButton
              onPress={() => {
                onChangeText?.('');
                inputRef.current?.blur();
              }}
              variant="unstyled"
              p="1"
              style={styles.button}
            >
              <Text>Cancel</Text>
            </AButton>
          </>
        ) : null}
      </HStack>
    );
  }
);

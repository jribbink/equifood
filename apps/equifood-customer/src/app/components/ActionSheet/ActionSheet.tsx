import { Box, NativeBaseProviderProps, ZStack } from 'native-base';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { Animated, GestureResponderEvent } from 'react-native';
import Svg, { Rect, RectProps } from 'react-native-svg';

type ArgumentTypes<F extends (props: any) => ReactElement | null> = F extends (
  args: infer A
) => any
  ? A
  : never;

interface ActionSheetProps extends ArgumentTypes<typeof Box> {
  isOpen: boolean;
  children: ReactNode | undefined;
  onClose: () => void;
  grabIndicatorProps?: RectProps;
}

function ActionSheet({
  isOpen,
  onClose,
  children,
  grabIndicatorProps,
  ...props
}: ActionSheetProps) {
  const [startPos, setStartPos] = useState<number>(0);
  const [currentOffset] = useState<Animated.Value>(new Animated.Value(0));
  const [currentHeight, setCurrentHeight] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      currentOffset.setValue(currentHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentHeight]);

  useEffect(() => {
    currentOffset.setValue(isOpen ? currentHeight : 0);
    const animation = Animated.timing(currentOffset, {
      toValue: isOpen ? 0 : currentHeight,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start();
  }, [isOpen, currentOffset, currentHeight]);

  function handleTouchStart(event: GestureResponderEvent) {
    setStartPos(event.nativeEvent.pageY);
  }

  function handleTouchMove(event: GestureResponderEvent) {
    const newOffset = event.nativeEvent.pageY - startPos;
    if (newOffset > 0) currentOffset.setValue(newOffset);
  }

  function handleTouchEnd(event: GestureResponderEvent) {
    const newOffset = event.nativeEvent.pageY - startPos;
    if (newOffset > 0.4 * currentHeight) {
      Animated.timing(currentOffset, {
        toValue: currentHeight,
        duration: 500,
        useNativeDriver: true,
      }).start(() => onClose());
    } else {
      Animated.timing(currentOffset, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }

  if (!isOpen) return null;
  return (
    <Animated.View
      style={{
        transform: [{ translateY: currentOffset }],
        width: '100%',
        padding: 0,
        position: 'absolute',
        overflow: 'hidden',
      }}
      onLayout={(e) => setCurrentHeight(e.nativeEvent.layout.height)}
    >
      <Box
        backgroundColor="gray.50"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        roundedTop={25}
        padding={25}
        width="full"
        height="full"
        {...props}
      >
        {children}
      </Box>
      <Svg width="100%" height="25" style={{ position: 'absolute', top: 0 }}>
        <Rect
          x="45%"
          y="13"
          fill="#666666"
          height="4"
          width="10%"
          rx={2}
          ry={2}
          {...grabIndicatorProps}
        ></Rect>
      </Svg>
    </Animated.View>
  );
}

export default ActionSheet;

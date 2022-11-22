import { Box } from 'native-base';
import { ReactNode, useEffect, useState } from 'react';
import { Animated, GestureResponderEvent } from 'react-native';

interface ActionSheetProps {
  isOpen: boolean;
  children: ReactNode | undefined;
  onClose: () => void;
}

function ActionSheet({
  isOpen,
  onClose,
  children,
  ...props
}: ActionSheetProps) {
  const [startPos, setStartPos] = useState<number>(0);
  const [currentOffset] = useState<Animated.Value>(new Animated.Value(0));
  const [currentHeight, setCurrentHeight] = useState<number>(0);

  useEffect(() => {
    if (!isOpen) {
      currentOffset.setValue(currentHeight);
    }
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
    </Animated.View>
  );
}

export default ActionSheet;

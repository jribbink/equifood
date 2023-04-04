import { createRef, useCallback, useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import MapView from 'react-native-maps';
import { Text, View } from 'native-base';
import { StyleSheet } from 'react-native';
import {
  GestureDetector,
  ScrollView,
  Gesture,
  gestureHandlerRootHOC,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedProps,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import { useTheme, VStack } from 'native-base';

const AScrollView = Animated.createAnimatedComponent(ScrollView);

interface ScrollingSheetProps {
  children: React.ReactNode;
  paddingBottom: SharedValue<number>;
}

function ScrollingSheet({ children, paddingBottom }: ScrollingSheetProps) {
  const theme = useTheme();
  const [{ width, height }, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const open = height * 0.1;
  const closed = height * 0.6;
  const scrollRef = useRef();

  const moving = useSharedValue(false);
  const prevY = useSharedValue(closed);
  const transY = useSharedValue(closed);
  const movedY = useSharedValue(0);
  const scrollY = useSharedValue(0);

  useAnimatedReaction(
    () => transY.value,
    (v: number) => {
      paddingBottom.value = v;
    },
    []
  );

  const scrollTo = useCallback(
    (...props) => {
      scrollRef?.current?.scrollTo(...props);
    },
    [scrollRef]
  );

  // scroll handler for scrollview
  const scrollHandler = useAnimatedScrollHandler(({ contentOffset }) => {
    scrollY.value = Math.round(contentOffset.y);
  });

  // pan handler for sheet
  const gesture = Gesture.Pan()
    .onBegin(() => {
      // touching screen
      moving.value = true;
    })
    .onUpdate((e) => {
      // move sheet if top or scrollview or is closed state
      if (scrollY.value === 0 || prevY.value === closed) {
        transY.value = prevY.value + e.translationY - movedY.value;

        // capture movement, but don't move sheet
      } else {
        movedY.value = e.translationY;
      }
      // simulate scroll if user continues touching screen
      if (prevY.value !== open && transY.value < open) {
        runOnJS(scrollTo)({
          y: -transY.value + open,
          animated: false,
        });
      }
    })
    .onEnd((e) => {
      // close sheet if velocity or travel is good
      if ((e.velocityY > 500 || e.translationY > 100) && scrollY.value < 1) {
        transY.value = withTiming(closed, { duration: 200 });
        prevY.value = closed;

        // else open sheet on reverse
      } else if (e.velocityY < -500 || e.translationY < -100) {
        transY.value = withTiming(open, { duration: 200 });
        prevY.value = open;

        // don't do anything
      } else {
        transY.value = withTiming(prevY.value, { duration: 200 });
      }
    })
    .onFinalize((e) => {
      // stopped touching screen
      moving.value = false;
      movedY.value = 0;
    })
    .simultaneousWithExternalGesture(scrollRef);

  // styles for screem
  const styles = {
    screen: {
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    sheet: useAnimatedStyle(() => ({
      // don't open beyond the open limit
      transform: [
        {
          translateY: interpolate(
            transY.value,
            [0, open, closed, height],
            [open, open, closed, closed + 20],
            'clamp'
          ),
        },
      ],
      shadowOffset: { height: -2, width: 0 },
      shadowOpacity: 0.15,
      backgroundColor: theme.colors.white,
    })),
    blur: {
      padding: 1,
      overflow: 'hidden',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: 'rgba(255,255,255,.65)',
    },
    scrollViewContainer: {
      paddingBottom: height * 0.3,
    },
    scrollViewProps: useAnimatedProps(() => ({
      // only scroll if sheet is open
      scrollEnabled: prevY.value === open,
      // only bounce at bottom or not touching screen
      bounces: scrollY.value > 0 || !moving.value,
    })),
    bar: {
      width: 50,
      height: 5,
      marginTop: 5,
      borderRadius: 5,
      backgroundColor: '#bbb',
      marginLeft: width / 2 - 25,
    },
    header: {
      borderBottomColor: 'rgba(0,0,0,.15)',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
      padding: 15,
      fontSize: 21,
      fontWeight: '600',
    },
    button: {
      fontSize: 15,
      borderBottomColor: 'rgba(0,0,0,.15)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingVertical: 20,
      paddingHorizontal: 15,
    },
    image: {
      width: '100%',
      borderRadius: 10,
      height: width / 2,
      marginBottom: 15,
    },
  };

  return (
    <View
      style={styles.screen}
      onLayout={(e) =>
        setDimensions({
          width: e.nativeEvent.layout.width,
          height: e.nativeEvent.layout.height,
        })
      }
    >
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.sheet}>
          <View style={styles.bar} />
          <View style={styles.header}>
            <Text style={styles.title}>Header</Text>
          </View>
          <AScrollView
            ref={scrollRef}
            scrollEventThrottle={1}
            onScroll={scrollHandler}
            animatedProps={styles.scrollViewProps}
            contentContainerStyle={styles.scrollViewContainer}
          >
            {children}
          </AScrollView>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default gestureHandlerRootHOC(ScrollingSheet);

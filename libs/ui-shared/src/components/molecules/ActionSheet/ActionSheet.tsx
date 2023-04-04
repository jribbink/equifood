import { Box } from 'native-base';
import {
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  View,
} from 'react-native';
import Svg, { Rect, RectProps } from 'react-native-svg';
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedReaction,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';

const AScrollView = Animated.createAnimatedComponent(ScrollView);

type ArgumentTypes<F extends (props: any) => ReactElement | null> = F extends (
  args: infer A
) => any
  ? A
  : never;

interface ActionSheetProps extends ArgumentTypes<typeof Box> {
  point: number;
  points: number[];
  enabled: boolean;
  onPointChange: (point: number) => void;
  children: ReactNode | undefined;
  grabIndicatorProps?: RectProps;
  offset?: number;
  onTranslateYChange: (value: number) => void;
  handleShouldSetPanResponder: (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => boolean;
}

export const ActionSheet = forwardRef<View, ActionSheetProps>(
  (
    {
      point,
      points,
      enabled,
      onPointChange,
      children,
      grabIndicatorProps,
      offset = 0,
      onTranslateYChange,
      handleShouldSetPanResponder,
      ...props
    },
    ref
  ) => {
    console.log('RELOADAS');
    const start = useSharedValue(points[point]);
    const pan = useSharedValue(0);
    const translateY = useDerivedValue(
      () => start.value + pan.value,
      [start, pan]
    );
    const _pan = useSharedValue(0);
    const _start = useSharedValue(points[point]);
    const enabledRef = useSharedValue(enabled);
    const scrollRef = useRef();

    const panToPoint = useCallback(
      (point: number) => {
        start.value = withTiming(points[point]);
        //start.value = withTiming(points[point], { duration: 500 });
      },
      [start, points]
    );

    useEffect(() => {
      panToPoint(point);
    }, [point, panToPoint]);

    //useAnimatedReaction()

    /*useEffect(() => {
      start.addListener(({ value }) => {
        _start.current = value;
        onTranslateYChange?.(value);
      });
    }, [start, onTranslateYChange]);*/

    const animationEnd = useCallback(() => {
      const goal = _start.value;
      const closest_idx = points.reduce(
        ([best, best_idx], curr, idx) => {
          return Math.abs(curr - goal) < Math.abs(best - goal)
            ? [curr, idx]
            : [best, best_idx];
        },
        [Infinity, -1]
      )[1];

      panToPoint(closest_idx);
      //onPointChange(closest_idx);
    }, [panToPoint, onPointChange, points, _start]);
    const consoleLog = console.log;

    const gesture = Gesture.Pan()
      .onBegin(() => {
        // touching screen
        cancelAnimation(start);
      })
      .onUpdate((e) => {
        //runOnJS(onTranslateYChange)(_start.value + e.translationY);
        _pan.value = e.translationY;
      })
      .onEnd((e) => {
        const startVal = _start.value + _pan.value;

        _start.value = startVal;
        _pan.value = 0;

        runOnJS(animationEnd)();
        //runOnJS(consoleLog)(translateY.value);
      })
      .simultaneousWithExternalGesture(scrollRef);

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={{
            transform: [{ translateY: translateY.value }],
            width: '100%',
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <Box
            backgroundColor="gray.50"
            roundedTop={25}
            padding={25}
            width="full"
            height="full"
            ref={ref}
            {...props}
          >
            <ScrollView>{children}</ScrollView>
          </Box>
          <Svg
            width="100%"
            height="25"
            style={{ position: 'absolute', top: 0 }}
          >
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
      </GestureDetector>
    );
  }
);

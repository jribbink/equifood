import { Box } from 'native-base';
import { ReactElement, ReactNode, useCallback, useEffect, useRef } from 'react';
import { Animated, PanResponder } from 'react-native';
import Svg, { Rect, RectProps } from 'react-native-svg';

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
  onTranslateYChange?: (value: number) => void;
}

export function ActionSheet({
  point,
  points,
  enabled,
  onPointChange,
  children,
  grabIndicatorProps,
  offset = 0,
  onTranslateYChange,
  ...props
}: ActionSheetProps) {
  const start = useRef(new Animated.Value(points[point])).current;
  const pan = useRef(new Animated.Value(0)).current;
  const translateY = useRef(Animated.add(start, pan)).current;
  const _pan = useRef(0);
  const _start = useRef(points[point]);
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  const panToPoint = useCallback(
    (point: number) => {
      Animated.timing(start, {
        toValue: points[point],
        duration: 500,
        useNativeDriver: true,
      }).start();
    },
    [start, points]
  );

  useEffect(() => {
    panToPoint(point);
  }, [point, panToPoint]);

  useEffect(() => {
    start.addListener(({ value }) => {
      _start.current = value;
      onTranslateYChange?.(value);
    });
  }, [start]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => enabledRef.current,
      onPanResponderStart: (e, gestureState) => {
        start.stopAnimation();
      },
      onPanResponderMove: (e, gestureState) => {
        onTranslateYChange?.(_start.current + gestureState.dy);
        _pan.current = gestureState.dy;
        Animated.event([null, { dy: pan }], {
          useNativeDriver: false,
        })(e, gestureState);
      },
      onPanResponderRelease: (_e, gestureState) => {
        const startVal = _start.current + _pan.current;

        start.setValue(startVal);
        pan.setValue(0);

        const goal = startVal;
        const closest_idx = points.reduce(
          ([best, best_idx], curr, idx) => {
            return Math.abs(curr - goal) < Math.abs(best - goal)
              ? [curr, idx]
              : [best, best_idx];
          },
          [Infinity, -1]
        )[1];

        panToPoint(closest_idx);
        onPointChange(closest_idx);
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateY }],
        width: '100%',
        padding: 0,
        overflow: 'hidden',
      }}
      {...panResponder.panHandlers}
    >
      <Box
        backgroundColor="gray.50"
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

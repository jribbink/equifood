import { Box } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import React, { RefObject, useEffect, useState } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle, Rect, Text as SvgText } from 'react-native-svg';

export interface ProgressStep<T> {
  text: string;
  key: T;
}

interface ProgressStepsProps<T> extends InterfaceBoxProps {
  steps: ProgressStep<T>[];
  currentIndex: number;
  cancelled?: boolean;
  stepRadius?: number;
  lineWidth?: number;
  lineSpacing?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export function ProgressSteps<T>({
  steps,
  currentIndex,
  cancelled = false,
  stepRadius = 25,
  lineWidth = 5,
  lineSpacing = 0,
  primaryColor = 'green',
  secondaryColor = '#BBBBBB',
  ...props
}: ProgressStepsProps<T>) {
  const [dims, setDims] = useState<[number, number]>([0, 0]);

  function resolveStatus(i: number) {
    if (currentIndex > i) {
      return 'complete';
    } else if (currentIndex === i) {
      return 'pending';
    } else {
      return 'idle';
    }
  }

  const height = stepRadius * 2 + lineWidth + 25;

  return (
    <Box height={height + 'px'} {...props}>
      <Svg
        height="100%"
        width="100%"
        onLayout={({
          nativeEvent: {
            layout: { width, height },
          },
        }) => setDims([width, height])}
      >
        {[...new Array(steps.length - 1).keys()].map((i) => (
          <Rect
            key={i}
            x={dims[0] * ((i + 0.5) / steps.length) + stepRadius + lineSpacing}
            y={stepRadius + lineWidth / 2 - lineWidth / 2}
            width={dims[0] / steps.length - stepRadius * 2 - lineSpacing * 2}
            height={lineWidth}
            fill={i >= currentIndex ? secondaryColor : primaryColor}
          ></Rect>
        ))}

        {steps.map((step, i) => {
          const status = resolveStatus(i);
          return (
            <React.Fragment key={i}>
              <ProgressStep
                radius={stepRadius}
                cx={dims[0] * ((i + 0.5) / steps.length)}
                cy={stepRadius + lineWidth / 2}
                step={step}
                index={i}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                status={status}
                cancelled={cancelled}
                animated={currentIndex - 1 === i}
              ></ProgressStep>
              <SvgText
                fill={status === 'idle' ? secondaryColor : primaryColor}
                stroke="none"
                fontSize={15}
                x={dims[0] * ((i + 0.5) / steps.length)}
                y={stepRadius * 2 + lineWidth + 7}
                alignmentBaseline="top"
                textAnchor="middle"
              >
                {step.text}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </Box>
  );
}

export function ProgressStep<T>({
  radius,
  cx,
  cy,
  step,
  index,
  primaryColor,
  secondaryColor,
  status,
  cancelled,
  animated,
}: {
  radius: number;
  cx: number;
  cy: number;
  step: ProgressStep<T>;
  index: number;
  primaryColor: string;
  secondaryColor: string;
  status: 'idle' | 'pending' | 'complete' | 'cancelled';
  cancelled: boolean;
  animated: boolean;
}) {
  const _circleRef: RefObject<View> = React.createRef();

  useEffect(() => {
    if (!animated) return;

    const animation = new Animated.Value(0.95);
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          duration: 750,
          toValue: 1.05,
          useNativeDriver: false,
        }),
        Animated.timing(animation, {
          duration: 750,
          toValue: 0.95,
          useNativeDriver: false,
        }),
      ])
    );
    loop.start();

    animation.addListener(({ value }) => {
      _circleRef.current?.setNativeProps({
        r: value * radius,
      });
    });

    return () => loop.stop();
  }, [animated, _circleRef, radius]);

  let styles: {
    fill: string;
    stroke: string;
    innerText: string;
    textFill: string;
  };
  switch (status) {
    case 'idle':
      styles = {
        fill: secondaryColor,
        stroke: 'none',
        innerText: String(index + 1),
        textFill: 'white',
      };
      break;
    case 'pending':
      styles = {
        fill: 'white',
        stroke: primaryColor,
        innerText: String(index + 1),
        textFill: primaryColor,
      };
      break;
    case 'complete':
      styles = {
        fill: primaryColor,
        stroke: 'none',
        innerText: '✓',
        textFill: 'white',
      };
      break;
    case 'cancelled':
      styles = {
        fill: primaryColor,
        stroke: 'none',
        innerText: '✓',
        textFill: 'white',
      };
  }

  return (
    <>
      <Circle
        ref={_circleRef}
        cx={cx}
        cy={cy}
        r={radius}
        stroke={styles.stroke}
        strokeWidth="5"
        fill={styles.fill}
      />
      <SvgText
        fill={styles.textFill}
        stroke="none"
        fontSize="20"
        fontWeight="bold"
        x={cx}
        y={cy}
        alignmentBaseline="middle"
        textAnchor="middle"
      >
        {styles.innerText}
      </SvgText>
    </>
  );
}

import { Box } from 'native-base';
import { InterfaceBoxProps } from 'native-base/lib/typescript/components/primitives/Box';
import { useEffect, useState } from 'react';
import { Animated } from 'react-native';
import Svg, { Circle, Rect, Text as SvgText } from 'react-native-svg';

export interface ProgressStep {
  text: string;
}

interface ProgressStepsProps extends InterfaceBoxProps {
  steps: ProgressStep[];
  currentIndex: number;
  cancelled?: boolean;
  stepRadius?: number;
  lineWidth?: number;
  lineSpacing?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

function ProgressSteps({
  steps,
  currentIndex,
  cancelled = false,
  stepRadius = 25,
  lineWidth = 5,
  lineSpacing = 0,
  primaryColor = 'green',
  secondaryColor = '#BBBBBB',
  ...props
}: ProgressStepsProps) {
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

  return (
    <Box height={200} {...props}>
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
            y={dims[1] / 2 - lineWidth / 2}
            width={dims[0] / steps.length - stepRadius * 2 - lineSpacing * 2}
            height={lineWidth}
            fill={i >= currentIndex ? secondaryColor : primaryColor}
          ></Rect>
        ))}

        {steps.map((step, i) => (
          <ProgressStep
            key={i}
            radius={stepRadius}
            cx={dims[0] * ((i + 0.5) / steps.length)}
            cy={dims[1] / 2}
            step={step}
            index={i}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            status={resolveStatus(i)}
            cancelled={cancelled}
          ></ProgressStep>
        ))}
      </Svg>
    </Box>
  );
}

function ProgressStep({
  radius,
  cx,
  cy,
  step,
  index,
  primaryColor,
  secondaryColor,
  status,
  cancelled,
}: {
  radius: number;
  cx: number;
  cy: number;
  step: ProgressStep;
  index: number;
  primaryColor: string;
  secondaryColor: string;
  status: 'idle' | 'pending' | 'complete' | 'cancelled';
  cancelled: boolean;
}) {
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

  const dash = '';
  const dashStart = useState(new Animated.Value(0))[0];
  const dashEnd = useState(new Animated.Value(0))[0];

  const [d, setDash] = useState<number>();

  useEffect(() => {
    if (status === 'pending') {
      Animated.loop(
        Animated.timing(dashStart, {
          toValue: 2 * radius * Math.PI,
          duration: 1000,
          useNativeDriver: false,
        })
      ).start();
    }
  }, [status]);
  useEffect(() => {
    dashStart.addListener((e) => setDash(e.value));
  }, [dashStart]);

  return (
    <>
      <Circle
        cx={cx}
        cy={cy}
        r={radius}
        stroke={styles.stroke}
        strokeWidth="5"
        strokeDasharray={[0, d, 30, 1000]}
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

export default ProgressSteps;

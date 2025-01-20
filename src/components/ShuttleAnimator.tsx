import React, {useImperativeHandle, useMemo} from 'react';
import ShuttleCompact from '@/components/ShuttleCompact';
import {Box, HTMLChakraProps} from '@chakra-ui/react';
import {SpringRef, useSpring} from '@react-spring/web';
import Animated from './Animated';

export type ShuttleAnimatorRef = {
  springApi: SpringRef<{offsetDistance: string}>;
};

type ShuttleAnimatorProps = {
  ref?: React.Ref<ShuttleAnimatorRef>;
  positionStart: {x: number; y: number};
  positionEnd: {x: number; y: number};
  animate: boolean;
} & Partial<HTMLChakraProps<'svg'>>;

const easing = {
  easeInOutBack: (x: number): number => {
    const c1 = 1.70158;
    const c2 = c1 * 1.525;

    return x < 0.5
      ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
      : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
  },
  easeOutCubic: (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  },
  easeOutExpo: (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  },
  easeInOutSine: (x: number): number => {
    return -(Math.cos(Math.PI * x) - 1) / 2;
  },
  easeOutBack: (x: number): number => {
    const c1 = 1.70158;
    const c3 = c1 + 1;

    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
  },
};

const ShuttleAnimator = ({
  ref,
  positionStart,
  positionEnd,
  animate,
  ...props
}: ShuttleAnimatorProps) => {
  const rotate = 90;
  const [{offsetDistance}, api] = useSpring(
    () => ({
      from: {offsetDistance: '0%'},
      to: {offsetDistance: animate ? '100%' : '0%'},
      loop: true,
      config: {
        duration: 2000,
        easing: easing.easeOutExpo,
      },
    }),
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      springApi: api,
    }),
    [api]
  );

  const path = useMemo(() => {
    // mid-point of line:
    const mp = {
      x: (positionEnd.x + positionStart.x) * 0.5,
      y: (positionEnd.y + positionStart.y) * 0.5,
    };

    // angle of perpendicular to line:
    const theta =
      Math.atan2(
        positionEnd.y - positionStart.y,
        positionEnd.x - positionStart.x
      ) -
      Math.PI / 2;

    // distance of control point from mid-point of line:
    const offset = 100;

    // location of control point:
    const c1 = {
      x: mp.x + offset * Math.cos(theta),
      y: mp.y + offset * Math.sin(theta),
    };

    // construct the command to draw a quadratic curve
    return `M${positionStart.x} ${positionStart.y} Q${c1.x} ${c1.y} ${positionEnd.x} ${positionEnd.y}`;
  }, [positionEnd.x, positionEnd.y, positionStart.x, positionStart.y]);
  return (
    <>
      <Animated.Box
        position="absolute"
        top={1}
        left={0}
        offsetPath={`path("${path}")`}
        style={{offsetDistance}}
        zIndex={1000}
      >
        <ShuttleCompact {...props} transform={`rotate(${rotate}deg)`} />
      </Animated.Box>
      <Box
        position="absolute"
        top={`${positionStart.y}px`}
        left={`${positionStart.x}px`}
        bg="red"
        height={1}
        width={1}
        rounded="full"
      />
      <Box
        position="absolute"
        top={`${positionEnd.y}px`}
        left={`${positionEnd.x}px`}
        bg="red"
        height={1}
        width={1}
        rounded="full"
      />
    </>
  );
};

export default ShuttleAnimator;

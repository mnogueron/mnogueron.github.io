import Animated from '@/components/Animated';
import React, {useEffect, useMemo} from 'react';
import {useSpringValue} from '@react-spring/web';
import {Positions, WindowState} from '@/os/store/types';
import {BoxProps} from '@chakra-ui/react';

type AppWindowContainerProps = {
  children: React.ReactNode;
  state: WindowState;
  positions: Positions;
  priority: number;
  isReduced: boolean;
} & BoxProps;

const AppWindowContainer = ({
  children,
  state,
  positions,
  priority,
  isReduced,
  ...props
}: AppWindowContainerProps) => {
  const topResizerAnimation = useSpringValue(positions.top);
  const leftResizerAnimation = useSpringValue(positions.left);
  const widthResizerAnimation = useSpringValue(positions.width, {
    onChange: value => console.log(value),
  });
  const heightResizerAnimation = useSpringValue(positions.height);

  const {top, left, width, height} = useMemo(() => {
    if (state === WindowState.FULL_SCREEN) {
      return {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      };
    }
    return {
      top: `${positions.top}px`,
      left: `${positions.left}px`,
      width: `${positions.width}px`,
      height: `${positions.height}px`,
    };
  }, [positions.height, positions.left, positions.top, positions.width, state]);

  useEffect(() => {
    if (state === WindowState.FULL_SCREEN) {
      console.log('start animation');
      widthResizerAnimation.start(positions.width);
      heightResizerAnimation.start(positions.height);
    } else {
      widthResizerAnimation.start(positions.width, {immediate: true});
      heightResizerAnimation.start(positions.height, {immediate: true});
    }
  }, [
    heightResizerAnimation,
    positions.height,
    positions.width,
    state,
    widthResizerAnimation,
  ]);

  // TODO handle reduced state and animation
  if (isReduced) {
    return null;
  }

  return (
    <Animated.Box
      {...props}
      position="absolute"
      zIndex={priority}
      bg="#404552"
      borderRadius={8}
      boxShadow="xs"
      border="2px solid #2e333f"
      style={{
        top,
        left,
        width,
        height,
      }}
    >
      {children}
    </Animated.Box>
  );
};

export default AppWindowContainer;

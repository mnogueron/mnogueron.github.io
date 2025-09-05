import React from 'react';
import Animated from '@/components/Animated';
import {Positions, WindowState} from '@/os/store/types';
import {useAnimatedWindowStyle} from '@/os/AppWindow/AppWindowContainer/useAnimatedWindowStyle';

type AppWindowContainerProps = {
  id: string;
  children: React.ReactNode;
  windowState: WindowState;
  positions: Positions;
  priority: number;
  isReduced: boolean;
  onFocus: () => void;
};

const AppWindowContainer = ({
  id,
  children,
  windowState,
  positions,
  priority,
  onFocus,
  isReduced,
}: AppWindowContainerProps) => {
  const style = useAnimatedWindowStyle(positions, windowState, isReduced, id);
  return (
    <Animated.Box
      position="absolute"
      onMouseDownCapture={onFocus}
      zIndex={priority}
      bg="#404552"
      borderRadius={8}
      boxShadow="xs"
      border="2px solid #2e333f"
      style={style}
    >
      {children}
    </Animated.Box>
  );
};

export default AppWindowContainer;

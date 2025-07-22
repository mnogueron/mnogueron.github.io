import React, {useMemo} from 'react';
import {Box, BoxProps, Flex} from '@chakra-ui/react';
import {ResizeHandler} from '@/components/AppWindow/types';
import ResizeHandlers from '@/components/AppWindow/ResizeHandlers';
import AppHeader from './AppHeader';
import {Positions, WindowState} from '@/contexts/types';
import useMeasure from 'react-use-measure';

type WindowProps = {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  onResize: ResizeHandler;
  onMove: (delta: {x: number; y: number}) => void;
  onFocus: () => void;
  onFullScreen: () => void;
  onReduce: () => void;
  onFullScreenToggle: () => void;
  state: WindowState;
  positions: Positions;
  priority: number;
  isReduced: boolean;
  disableResize?: boolean;
  disableMove?: boolean;
} & Omit<BoxProps, 'onResize'>;

type WindowContainerProps = {
  children: React.ReactNode;
};

const WindowContainer = ({children}: WindowContainerProps) => {
  const [containerRef, {height, width}] = useMeasure();
  return (
    <Box
      ref={containerRef}
      flex={1}
      width="100%"
      position="relative"
      overflow="hidden"
      borderBottomRadius={6}
      css={{
        '--containerWidth': `${width}px`,
        '--containerHeight': `${height}px`,
      }}
    >
      {children}
    </Box>
  );
};

const AppWindow = ({
  title,
  children,
  onClose,
  onResize,
  onMove,
  onFocus,
  onFullScreen,
  onFullScreenToggle,
  onReduce,
  state,
  positions,
  priority,
  isReduced,
  disableResize,
  disableMove,
  onDragStart,
  onDragEnd,
  ...props
}: WindowProps) => {
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

  // TODO handle reduced state and animation
  if (isReduced) {
    return null;
  }

  return (
    <Box
      {...props}
      position="absolute"
      onMouseDownCapture={onFocus}
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
      <Box position="relative" height="100%" width="100%">
        <Flex direction="column" height="100%" width="100%">
          <AppHeader
            title={title}
            state={state}
            onClose={onClose}
            onMove={onMove}
            onFullScreen={onFullScreen}
            onFullScreenToggle={onFullScreenToggle}
            onReduce={onReduce}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            disableMove={state === WindowState.FULL_SCREEN || disableMove}
          />
          <WindowContainer>{children}</WindowContainer>
        </Flex>
        {!(state === WindowState.FULL_SCREEN || disableResize) && (
          <ResizeHandlers onResize={onResize} />
        )}
      </Box>
    </Box>
  );
};

export default AppWindow;

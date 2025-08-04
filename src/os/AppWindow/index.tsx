import React from 'react';
import {Box, BoxProps, Flex} from '@chakra-ui/react';
import {ResizeHandler} from '@/os/AppWindow/types';
import ResizeHandlers from '@/os/AppWindow/ResizeHandlers';
import AppHeader from './AppHeader';
import {Positions, WindowState} from '@/os/store/types';
import useMeasure from 'react-use-measure';
import AppWindowContainer from '@/os/AppWindow/AppWindowContainer';

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
} & Omit<BoxProps, 'onResize'>; // TODO simplify state to only have onDragStart, onDragEnd, probably rename

type WindowContainerProps = {
  children: React.ReactNode;
};

const WindowContainer = ({children}: WindowContainerProps) => {
  const [containerRef, {height, width}] = useMeasure();

  // TODO prevent window container to change if the window is being reduced
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
}: WindowProps) => {
  return (
    <AppWindowContainer
      onFocus={onFocus}
      windowState={state}
      positions={positions}
      priority={priority}
      isReduced={isReduced}
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
    </AppWindowContainer>
  );
};

export default AppWindow;

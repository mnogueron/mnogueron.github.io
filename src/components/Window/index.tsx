import React, {useMemo} from 'react';
import {Box, BoxProps, Flex} from '@chakra-ui/react';
import {JetBrainsMono} from '@/styles/fonts';
import {ResizeHandler} from '@/components/Window/types';
import ResizeHandlers from '@/components/Window/ResizeHandlers';
import WindowHeader from '@/components/Window/WindowHeader';
import {Positions, WindowState} from '@/contexts/types';

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

const Window = ({
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
      top={top}
      left={left}
      width={width}
      height={height}
      zIndex={priority}
    >
      <Box position="relative" height="100%" width="100%">
        <Flex
          direction="column"
          height="100%"
          width="100%"
          bg="#404552"
          borderRadius={8}
          boxShadow="xs"
          border="2px solid #2e333f"
          className={JetBrainsMono.className}
          overflow="hidden"
        >
          <WindowHeader
            title={title}
            onClose={onClose}
            onMove={onMove}
            onFullScreen={onFullScreen}
            onFullScreenToggle={onFullScreenToggle}
            onReduce={onReduce}
            disableMove={disableMove}
          />
          <Box
            height="100%"
            width="100%"
            position="relative"
            className={JetBrainsMono.className}
          >
            {children}
          </Box>
        </Flex>
        {!disableResize && <ResizeHandlers onResize={onResize} />}
      </Box>
    </Box>
  );
};

export default Window;

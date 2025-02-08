import React from 'react';
import {Box, BoxProps, Flex, FlexProps} from '@chakra-ui/react';
import {JetBrainsMono} from '@/styles/fonts';
import {ResizeHandler} from '@/components/Window/types';
import ResizeHandlers from '@/components/Window/ResizeHandlers';
import WindowHeader from '@/components/Window/WindowHeader';

type WindowProps = {
  children: React.ReactNode;
  title?: string;
  headerProps?: FlexProps;
  containerProps?: BoxProps;
  onClose?: () => void;
  onResize: ResizeHandler;
  onMove: (delta: {x: number; y: number}) => void;
  onFocus: () => void;
  onFullScreen: () => void;
  onFullScreenToggle: () => void;
} & Omit<BoxProps, 'onResize'>;

const Window = ({
  title,
  children,
  headerProps,
  containerProps,
  onClose,
  onResize,
  onMove,
  onFocus,
  onFullScreen,
  onFullScreenToggle,
  ...props
}: WindowProps) => {
  return (
    <Box {...props} onMouseDownCapture={onFocus}>
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
            {...headerProps}
          />
          <Box
            {...containerProps}
            height="100%"
            width="100%"
            position="relative"
            className={JetBrainsMono.className}
          >
            {children}
          </Box>
        </Flex>
        <ResizeHandlers onResize={onResize} />
      </Box>
    </Box>
  );
};

export default Window;

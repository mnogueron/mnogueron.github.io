import {Box, Flex, FlexProps, HStack, Text} from '@chakra-ui/react';
import React, {useContext, useRef} from 'react';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {FULL_SCREEN_PROMPT_TIMEOUT} from '@/constants';
import {JetBrainsMono} from '@/styles/fonts';
import {EMPTY_DRAG_IMAGE} from '@/dragUtils';

type WindowHeaderProps = {
  title?: string;
  onClose?: () => void;
  onMove: (delta: {x: number; y: number}) => void;
  onFullScreen: () => void;
  onFullScreenToggle: () => void;
  onReduce: () => void;
  disableMove?: boolean;
} & FlexProps;

const WindowHeader = ({
  title,
  onClose,
  onMove,
  onDragStart,
  onDragEnd,
  onFullScreen,
  onFullScreenToggle,
  onReduce,
  disableMove,
  ...props
}: WindowHeaderProps) => {
  const {fullScreenPrompt, updateFullScreenPromptState} =
    useContext(WindowAppContext);
  const topTimeout = useRef<number>(null);
  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    if (disableMove) {
      return;
    }

    dragStart.current = {x: e.clientX, y: e.clientY};
    e.dataTransfer.effectAllowed = 'move';

    // Disable drag visual effect
    if (EMPTY_DRAG_IMAGE.complete) {
      e.dataTransfer.setDragImage(EMPTY_DRAG_IMAGE, 0, 0);
    }

    if (onDragStart) {
      onDragStart(e);
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    if (e.clientY < 10) {
      if (!topTimeout.current) {
        topTimeout.current = window.setTimeout(() => {
          updateFullScreenPromptState(true);
        }, FULL_SCREEN_PROMPT_TIMEOUT);
      }
    } else {
      if (topTimeout.current) {
        window.clearTimeout(topTimeout.current);
        topTimeout.current = null;
      }
      if (fullScreenPrompt) {
        updateFullScreenPromptState(false);
      }
    }
    onMove(delta);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    onMove(delta);
    if (topTimeout.current) {
      window.clearTimeout(topTimeout.current);
      topTimeout.current = null;
    }
    if (fullScreenPrompt) {
      updateFullScreenPromptState(false);
      onFullScreen();
    } else if (onDragEnd) {
      onDragEnd(e);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent drag animation feedback
    e.preventDefault();
  };

  return (
    <Flex
      px={2}
      py={1}
      bg="#2e333f"
      justifyContent="space-between"
      alignItems="center"
      minHeight="26px"
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      {...props}
      className={JetBrainsMono.className}
      direction="row"
      draggable={disableMove ? undefined : 'true'}
    >
      <Text pointerEvents="none" fontSize="xs" userSelect="none">
        {title}
      </Text>
      <HStack gap={2}>
        <Box
          as="button"
          bg="#2cc640"
          width={3}
          height={3}
          borderRadius={6}
          border="1px solid #51a75c"
          onClick={onReduce}
          cursor="pointer"
        />
        <Box
          as="button"
          bg="#fdbf2e"
          width={3}
          height={3}
          borderRadius={6}
          border="1px solid #d6a839"
          onClick={onFullScreenToggle}
          cursor="pointer"
        />
        <Box
          as="button"
          bg="#fe6256"
          width={3}
          height={3}
          borderRadius={6}
          border="1px solid #ca5f59"
          cursor="pointer"
          onClick={onClose}
          zIndex={1}
        />
      </HStack>
    </Flex>
  );
};

export default WindowHeader;

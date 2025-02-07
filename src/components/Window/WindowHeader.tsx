import {Box, Flex, FlexProps, HStack, Text} from '@chakra-ui/react';
import React, {useRef} from 'react';

type WindowHeaderProps = {
  title?: string;
  onClose?: () => void;
  onMove: (delta: {x: number; y: number}) => void;
} & FlexProps;

const WindowHeader = ({
  title,
  onClose,
  onMove,
  onDragStart,
  ...props
}: WindowHeaderProps) => {
  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragStart.current = {x: e.clientX, y: e.clientY};
    e.dataTransfer.effectAllowed = 'move';

    // Disable drag visual effect
    const img = document.createElement('img');
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);

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
    onMove(delta);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const delta = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    onMove(delta);
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
      direction="row"
      draggable="true"
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
          cursor="pointer"
        />
        <Box
          as="button"
          bg="#fdbf2e"
          width={3}
          height={3}
          borderRadius={6}
          border="1px solid #d6a839"
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

import React from 'react';
import {Box, BoxProps, Flex, HStack, Text} from '@chakra-ui/react';
import {JetBrainsMono} from '@/styles/fonts';

type WindowProps = {
  children: React.ReactNode;
  title?: string;
  containerProps?: BoxProps;
  onClose?: () => void;
} & BoxProps;

const Window = ({
  title,
  children,
  containerProps,
  onClose,
  ...props
}: WindowProps) => {
  return (
    <Box
      {...props}
      bg="#404552"
      borderRadius={8}
      boxShadow="xs"
      border="2px solid #2e333f"
      className={JetBrainsMono.className}
      overflow="hidden"
      gap={0}
    >
      <Flex
        px={2}
        py={1}
        bg="#2e333f"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        minHeight="26px"
      >
        <Text fontSize="xs">{title}</Text>
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
          />
        </HStack>
      </Flex>
      <Box
        p={{base: 1, md: 2}}
        {...containerProps}
        className={JetBrainsMono.className}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Window;

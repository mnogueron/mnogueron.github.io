import React from 'react';
import {BoxProps, Center, Icon} from '@chakra-ui/react';
import {FaXmark} from 'react-icons/fa6';

const CloseButton = (props: BoxProps) => {
  return (
    <Center
      as="button"
      {...props}
      bg="#fe6256"
      width={3}
      height={3}
      borderRadius={6}
      border="1px solid #ca5f59"
      cursor="pointer"
      zIndex={1}
    >
      <Icon
        fontSize="10px"
        color="gray.600"
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
      >
        <FaXmark />
      </Icon>
    </Center>
  );
};

export default CloseButton;

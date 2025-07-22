import React from 'react';
import {BoxProps, Center, Icon} from '@chakra-ui/react';
import {FaMinus} from 'react-icons/fa6';

const ReduceButton = (props: BoxProps) => {
  return (
    <Center
      as="button"
      {...props}
      bg="#fdbf2e"
      width={3}
      height={3}
      borderRadius={6}
      border="1px solid #d6a839"
      cursor="pointer"
    >
      <Icon
        fontSize="10px"
        color="gray.600"
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
      >
        <FaMinus />
      </Icon>
    </Center>
  );
};

export default ReduceButton;

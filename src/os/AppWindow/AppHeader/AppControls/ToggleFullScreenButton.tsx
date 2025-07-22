import React from 'react';
import {BoxProps, Center, Icon} from '@chakra-ui/react';
import {FaExpand, FaCompress} from 'react-icons/fa6';

const ToggleFullScreenButton = ({
  isFullScreen,
  ...props
}: BoxProps & {isFullScreen: boolean}) => {
  return (
    <Center
      as="button"
      {...props}
      bg="#2cc640"
      width={3}
      height={3}
      borderRadius={6}
      border="1px solid #51a75c"
      cursor="pointer"
    >
      <Icon
        fontSize="8px"
        color="gray.600"
        opacity={0}
        _groupHover={{
          opacity: 1,
        }}
      >
        {isFullScreen ? <FaCompress /> : <FaExpand />}
      </Icon>
    </Center>
  );
};

export default ToggleFullScreenButton;

import React from 'react';
import {HStack, StackSeparator} from '@chakra-ui/react';
import AppLauncher from '@/os/AppBar/AppLauncher';
import AppController from '@/os/AppBar/AppController';

const AppBar = () => {
  return (
    <HStack
      borderRadius="2xl"
      border="1px solid"
      borderColor="menubar.border"
      alignItems="center"
      p={{base: 2, md: 2}}
      zIndex="sticky"
      bg="menubar.background/90"
      position="absolute"
      bottom={1}
      gap={4}
      separator={<StackSeparator />}
    >
      <AppLauncher />
      <AppController />
    </HStack>
  );
};

export default AppBar;

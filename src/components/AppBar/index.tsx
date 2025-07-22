import React from 'react';
import {Flex} from '@chakra-ui/react';
import AppLauncher from '@/components/AppLauncher';
import AppController from '@/components/AppBar/AppController';

const AppBar = () => {
  return (
    <Flex
      width="100%"
      borderTop="1px solid"
      borderTopColor="menubar.border"
      alignItems="center"
      py={{base: 2, md: 3}}
      px={{base: 2, md: 3}}
      zIndex="sticky"
      bg="menubar.background"
      gap={4}
    >
      <AppLauncher />
      <AppController />
    </Flex>
  );
};

export default AppBar;

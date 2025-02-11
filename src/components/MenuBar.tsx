import React from 'react';
import {Flex} from '@chakra-ui/react';
import WipMenu from '@/components/WipMenu';
import AppMenu from '@/components/AppMenu';

const MenuBar = () => {
  return (
    <Flex
      width="100%"
      borderTop="1px solid"
      borderTopColor="menubar.border"
      alignItems="center"
      justifyContent="space-between"
      py={{base: 2, md: 3}}
      px={{base: 2, md: 3}}
      zIndex="sticky"
      bg="menubar.background"
    >
      <AppMenu />
      <WipMenu />
    </Flex>
  );
};

export default MenuBar;

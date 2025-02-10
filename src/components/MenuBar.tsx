import React, {useContext} from 'react';
import {Flex} from '@chakra-ui/react';
import WipMenu from '@/components/WipMenu';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import AppMenu from '@/components/AppMenu';

const MenuBar = () => {
  const {openApplication} = useContext(WindowAppContext);

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
      <AppMenu onMenuClick={openApplication} />
      <WipMenu />
    </Flex>
  );
};

export default MenuBar;

import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Shuttle from '@/os/AppBackground/Shuttle';
import {useWindowAppContext} from '@/contexts/WindowAppProvider';

const AppBackground = () => {
  const {openApplication} = useWindowAppContext();
  return (
    <Box height="100%">
      <Flex alignItems="center" justifyContent="center" height="100%">
        <Shuttle height="54dvh" onFeatherClick={openApplication} />
      </Flex>
    </Box>
  );
};

export default AppBackground;

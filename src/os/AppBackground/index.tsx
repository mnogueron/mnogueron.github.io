import React from 'react';
import {Box, Flex} from '@chakra-ui/react';
import Shuttle from '@/os/AppBackground/Shuttle';
import {useApplicationsStore} from '@/os/store';

const AppBackground = () => {
  const openApplication = useApplicationsStore(state => state.openApplication);
  return (
    <Box height="100%">
      <Flex alignItems="center" justifyContent="center" height="100%">
        <Shuttle height="54dvh" onFeatherClick={openApplication} />
      </Flex>
    </Box>
  );
};

export default AppBackground;

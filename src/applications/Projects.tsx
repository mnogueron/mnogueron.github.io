import React from 'react';
import Court from '@/components/Court';
import {Box} from '@chakra-ui/react';

const Projects = () => {
  const handleCourtClick = () => {
    // TODO handle court click
  };

  return (
    <Box height="100%">
      <Court
        onCourtClick={handleCourtClick}
        height="60vh"
        left={32}
        // TODO better align on multiple devices
      />
    </Box>
  );
};

Projects.appTitle = 'Projects';

export default Projects;

import React from 'react';
import Court from '@/applications/Projects/components/Court';
import {Box} from '@chakra-ui/react';

const Projects = () => {
  const handleCourtClick = () => {
    // TODO handle court click
  };

  return (
    <Box height="100%" bg="screen.projects">
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

Projects.preferredRatio = 1.3;
Projects.preferredRatioMobile = 0.7;
Projects.maxApplicationHeight = 900;
Projects.minMobileRatio = 0.55;

export default Projects;

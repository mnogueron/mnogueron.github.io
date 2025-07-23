import React from 'react';
import Court from '@/applications/Projects/components/Court';
import {Box} from '@chakra-ui/react';
import {AppComponent} from '@/applications/types';

const Projects: AppComponent = () => {
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

Projects.config = {
  appTitle: 'Projects',
  preferredRatio: 1.3,
  preferredRatioMobile: 0.7,
  maxApplicationHeight: 900,
  minMobileRatio: 0.55,
};

export default Projects;

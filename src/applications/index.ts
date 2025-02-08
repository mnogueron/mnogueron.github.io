import React from 'react';
import {ApplicationId} from '@/applications/types';
import AboutMe from '@/applications/AboutMe';
import Experiences from '@/applications/Experiences';
import Projects from '@/applications/Projects';

const Applications: {
  [key in ApplicationId]: React.ComponentType & {
    appTitle: string;
    preferredRatio: number;
    preferredRatioMobile: number;
    maxApplicationHeight: number;
    minMobileRatio: number;
  };
} = {
  [ApplicationId.ABOUT_ME]: AboutMe,
  [ApplicationId.EXPERIENCES]: Experiences,
  [ApplicationId.PROJECTS]: Projects,
};

export default Applications;

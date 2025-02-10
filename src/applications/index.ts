import React from 'react';
import {ApplicationId} from '@/applications/types';
import AboutMe from '@/applications/AboutMe';
import Experiences from '@/applications/Experiences';
import Projects from '@/applications/Projects';
import LandingTextAnimator from '@/applications/LandingTextAnimator';
import {Positions} from '@/contexts/types';

const Applications: {
  [key in ApplicationId]: React.ComponentType & {
    appTitle: string;
    preferredRatio: number;
    preferredRatioMobile: number;
    maxApplicationHeight: number;
    minMobileRatio: number;
    disableResize?: boolean;
    disableMove?: boolean;
    getStaticBox?: (container: {width: number; height: number}) => Positions;
  };
} = {
  [ApplicationId.ABOUT_ME]: AboutMe,
  [ApplicationId.EXPERIENCES]: Experiences,
  [ApplicationId.PROJECTS]: Projects,
  [ApplicationId.LANDING_TEXT_ANIMATOR]: LandingTextAnimator,
};

export default Applications;

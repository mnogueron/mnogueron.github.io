import React from 'react';
import {AppComponent, ApplicationId} from '@/applications/types';
import AboutMe from '@/applications/AboutMe';
import Experiences from '@/applications/Experiences';
import Projects from '@/applications/Projects';
import LandingTextAnimator from '@/applications/LandingTextAnimator';
import About from '@/applications/About';

const Applications: {
  [key in ApplicationId]: AppComponent;
} = {
  [ApplicationId.ABOUT_ME]: AboutMe,
  [ApplicationId.EXPERIENCES]: Experiences,
  [ApplicationId.PROJECTS]: Projects,
  [ApplicationId.LANDING_TEXT_ANIMATOR]: LandingTextAnimator,
  [ApplicationId.ABOUT_APP]: About,
};

type ApplicationProps = {
  appId: ApplicationId;
};

/**
 * This component handles the memoization layer around applications.
 * This avoids unnecessary re-rendering when the parent container are moved around
 * or scaled, unless wanted.
 */
export const ApplicationContainer = React.memo(({appId}: ApplicationProps) => {
  const AppComponent = Applications[appId];
  return AppComponent ? <AppComponent /> : null;
});

ApplicationContainer.displayName = 'ApplicationContainer';

export default Applications;

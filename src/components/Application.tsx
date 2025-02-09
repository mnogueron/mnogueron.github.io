import React, {useContext, useMemo} from 'react';
import AboutMe from '@/applications/AboutMe';
import Window from '@/components/Window';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {ApplicationId} from '@/applications/types';
import Projects from '@/applications/Projects';
import Experiences from '@/applications/Experiences';
import {ResizeDirection} from '@/components/Window/types';
import {WindowState} from '@/contexts/types';

type ApplicationProps = {
  id: string;
};

const Application = ({id}: ApplicationProps) => {
  const {
    applications,
    closeApplication,
    moveApplication,
    resizeApplication,
    focusApplication,
    fullScreenApplication,
    reduceApplication,
    toggleFullScreenApplication,
  } = useContext(WindowAppContext);

  const data = useMemo(() => {
    const application = applications[id];
    //const application = applications.find(a => a.id === id);
    if (!application) {
      return;
    }

    let AppComponent = undefined;
    let customProps = {};
    switch (application.appId) {
      case ApplicationId.ABOUT_ME:
        AppComponent = AboutMe;
        customProps = {
          bg: 'screen.aboutMe',
        };
        break;
      case ApplicationId.EXPERIENCES:
        AppComponent = Experiences;
        customProps = {
          bg: 'screen.experiences',
          overflowX: 'auto',
        };
        break;
      case ApplicationId.PROJECTS:
        AppComponent = Projects;
        customProps = {
          bg: 'screen.projects',
        };
        break;
    }

    return {
      application,
      AppComponent,
      customProps,
    };
  }, [applications, id]);

  const handleMove = (delta: {x: number; y: number}) => {
    moveApplication(id, delta);
  };

  const handleResize = (delta: {
    x: number;
    y: number;
    dir: ResizeDirection;
  }) => {
    resizeApplication(id, delta);
  };

  const handleClose = () => {
    closeApplication(id);
  };

  const handleFocus = () => {
    focusApplication(id);
  };

  const handleFullScreen = () => {
    fullScreenApplication(id);
  };

  const handleFullScreenToggle = () => {
    toggleFullScreenApplication(id);
  };

  const handleReduce = () => {
    reduceApplication(id);
  };

  if (!data?.AppComponent) {
    return null;
  }

  const {AppComponent, application, customProps} = data;

  // TODO handle reduced state and animation
  if (application.isReduced) {
    return null;
  }

  return (
    <Window
      title={AppComponent.appTitle}
      position="absolute"
      top={
        application.state === WindowState.FULL_SCREEN
          ? 0
          : `${application.positions.top}px`
      } // {base: 3, md: 6}
      left={
        application.state === WindowState.FULL_SCREEN
          ? 0
          : `${application.positions.left}px`
      } // {base: 3, md: 6}
      containerProps={customProps}
      width={
        application.state === WindowState.FULL_SCREEN
          ? '100%'
          : `${application.positions.width}px`
      }
      height={
        application.state === WindowState.FULL_SCREEN
          ? '100%'
          : `${application.positions.height}px`
      } // "90dvh"
      onClose={handleClose}
      onResize={handleResize}
      onMove={handleMove}
      onFocus={handleFocus}
      zIndex={application.priority}
      onReduce={handleReduce}
      onFullScreen={handleFullScreen}
      onFullScreenToggle={handleFullScreenToggle}
    >
      <AppComponent />
    </Window>
  );
};

export default Application;

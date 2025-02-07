import React, {useContext, useMemo} from 'react';
import AboutMe from '@/applications/AboutMe';
import Window from '@/components/Window';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {ApplicationId} from '@/applications/types';
import Projects from '@/applications/Projects';
import Experiences from '@/applications/Experiences';
import {ResizeDirection} from '@/components/Window/types';

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
          overflowY: 'auto',
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

  if (!data?.AppComponent) {
    return null;
  }

  const {AppComponent, application, customProps} = data;

  return (
    <Window
      title={AppComponent.appTitle}
      position="absolute"
      top={`${application.positions.top}px`} // {base: 3, md: 6}
      left={`${application.positions.left}px`} // {base: 3, md: 6}
      containerProps={customProps}
      width={`${application.positions.width}px`}
      height={`${application.positions.height}px`} // "90dvh"
      onClose={handleClose}
      onResize={handleResize}
      onMove={handleMove}
      onFocus={handleFocus}
      zIndex={application.priority}
    >
      <AppComponent />
    </Window>
  );
};

export default Application;

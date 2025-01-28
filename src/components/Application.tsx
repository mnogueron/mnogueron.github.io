import React, {useContext, useMemo, useRef} from 'react';
import AboutMe from '@/applications/AboutMe';
import Window from '@/components/Window';
import {WindowAppContext} from '@/contexts/WindowAppProvider';
import {ApplicationId} from '@/applications/types';
import Projects from '@/applications/Projects';
import Experiences from '@/applications/Experiences';

type ApplicationProps = {
  id: string;
};

const Application = ({id}: ApplicationProps) => {
  const {applications, closeApplication, moveApplication} =
    useContext(WindowAppContext);

  const data = useMemo(() => {
    const application = applications.find(a => a.id === id);
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

  const dragStart = useRef<{x: number; y: number}>({x: 0, y: 0});

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    dragStart.current = {x: e.clientX, y: e.clientY};
    e.dataTransfer.effectAllowed = 'move';

    // Disable drag visual effect
    const img = document.createElement('img');
    img.src =
      'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX === 0 && e.clientY === 0) {
      return;
    }
    const diff = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    moveApplication(id, diff.x, diff.y);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const diff = {
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    };
    dragStart.current = {x: e.clientX, y: e.clientY};
    moveApplication(id, diff.x, diff.y);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Prevent drag animation feedback
    e.preventDefault();
  };

  const handleClose = () => {
    closeApplication(id);
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
      //right={{base: 3, md: 6}}
      containerProps={customProps}
      width={`${application.positions.width}px`}
      height={`${application.positions.height}px`} // "90dvh"
      onClose={handleClose}
      headerProps={{
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        onDragOver: handleDragOver,
      }}
    >
      <AppComponent />
    </Window>
  );
};

export default Application;

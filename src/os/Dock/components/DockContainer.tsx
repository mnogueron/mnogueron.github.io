import React, {useState, useRef, useCallback} from 'react';
import {useSpringValue} from '@react-spring/web';
import {clamp} from '@react-spring/shared';

import {useWindowResize} from '@/hooks/useWindowResize';

import {DockContext} from '../DockContext';

import Animated from '@/components/Animated';

interface DockProps {
  children: React.ReactNode;
}

export const DOCK_ZOOM_LIMIT = [-100, 50];

export const DockContainer = ({children}: DockProps) => {
  const [hovered, setHovered] = useState(false);
  const [width, setWidth] = useState(0);
  const isZooming = useRef(false);
  const dockRef = useRef<HTMLDivElement>(null!);

  const setIsZooming = useCallback((value: boolean) => {
    isZooming.current = value;
    setHovered(!value);
  }, []);

  const zoomLevel = useSpringValue(1, {
    onChange: () => {
      setWidth(dockRef.current.clientWidth);
    },
  });

  useWindowResize(() => {
    setWidth(dockRef.current.clientWidth);
  });

  return (
    <DockContext.Provider value={{hovered, setIsZooming, width, zoomLevel}}>
      <Animated.HStack
        ref={dockRef}
        onMouseOver={() => {
          if (!isZooming.current) {
            setHovered(true);
          }
        }}
        onMouseOut={() => {
          setHovered(false);
        }}
        padding={2}
        gap={4}
        border="1px solid"
        borderColor="menubar.border"
        zIndex="sticky"
        bg="menubar.background/90"
        position="absolute"
        bottom={3}
        alignItems="flex-end"
        height="68px"
        willChange="contents"
        borderRadius="2xl"
        left="50%"
        transform="translateX(-50%)"
        transformOrigin="center bottom"
        style={{
          x: '-50%',
          scale: zoomLevel
            .to({
              range: [DOCK_ZOOM_LIMIT[0], 1, DOCK_ZOOM_LIMIT[1]],
              output: [2, 1, 0.5],
            })
            .to(value => clamp(0.5, 2, value)),
        }}
      >
        {children}
      </Animated.HStack>
    </DockContext.Provider>
  );
};

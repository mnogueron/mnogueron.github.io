import {Positions, WindowState} from '@/os/store/types';
import {useEffect, useMemo, useRef, useState} from 'react';
import {SpringProps, to, useSpringValue} from '@react-spring/web';
import {useApplicationsStore} from '@/os/store';

export const useAnimatedWindowStyle = (
  positions: Positions,
  windowState: WindowState,
  isReduced: boolean,
  id: string
) => {
  const previousWindowState = useRef(windowState);
  const previousIsReduced = useRef(isReduced);
  const [isAnimated, setIsAnimated] = useState(false);
  const [display, setDisplay] = useState<string | undefined>(undefined);
  const container = useApplicationsStore.use.container();

  const animationEvents: SpringProps<number> = useMemo(
    () => ({
      onRest: () => setIsAnimated(false),
    }),
    []
  );
  const topSpring = useSpringValue(0, animationEvents);
  const leftSpring = useSpringValue(0, animationEvents);
  const widthSpring = useSpringValue(0, animationEvents);
  const heightSpring = useSpringValue(0, animationEvents);
  const scaleSpring = useSpringValue(1);

  const {transform, width, height} = useMemo(
    () => ({
      /*top: `${positions.top}px`,
      left: `${positions.left}px`,*/
      transform: `translate3d(${positions.left}px, ${positions.top}px, 0)`,
      width: `${positions.width}px`,
      height: `${positions.height}px`,
    }),
    [positions.height, positions.left, positions.top, positions.width]
  );

  // TODO use previous value to keep track of the previous windowState and animate
  useEffect(() => {
    if (previousWindowState.current !== windowState) {
      console.log('start animation');
      setIsAnimated(true);
      topSpring.start(positions.top);
      leftSpring.start(positions.left);
      widthSpring.start(positions.width);
      heightSpring.start(positions.height);
    } else {
      topSpring.set(positions.top);
      leftSpring.set(positions.left);
      widthSpring.set(positions.width);
      heightSpring.set(positions.height);
    }
    previousWindowState.current = windowState;
  }, [
    positions.top,
    positions.left,
    positions.height,
    positions.width,
    windowState,
    leftSpring,
    topSpring,
    heightSpring,
    widthSpring,
  ]);

  // TODO handle reduced and expand animation
  // TODO Improve animation
  useEffect(() => {
    if (previousIsReduced.current !== isReduced) {
      console.log('Change reduce state', isReduced);
      setIsAnimated(true);
      if (isReduced) {
        topSpring.start(container.height * 0.9, {
          onRest: () => {
            console.log('Set display none');
            setDisplay('none');
          },
        });
        leftSpring.start(container.width / 2);
        scaleSpring.start(0.01);
        /*widthSpring.start(200);
        heightSpring.start(200);*/
      } else {
        setDisplay(undefined);
        topSpring.start(positions.top, {
          onStart: () => {
            console.log('Set display undefined');
          },
        });
        leftSpring.start(positions.left);
        scaleSpring.start(1);
        /*widthSpring.start(positions.width);
        heightSpring.start(positions.height);*/
      }
      previousIsReduced.current = isReduced;
    }
  }, [
    heightSpring,
    isReduced,
    leftSpring,
    positions.height,
    positions.left,
    positions.top,
    positions.width,
    topSpring,
    widthSpring,
    scaleSpring,
    container.height,
    container.width,
  ]);

  const styles = {
    /*top: isAnimated ? topSpring : top,
    left: isAnimated ? leftSpring : left,*/
    top: 0,
    left: 0,
    width: isAnimated ? widthSpring : width,
    height: isAnimated ? heightSpring : height,
    transform: isAnimated
      ? to(
          [topSpring, leftSpring],
          (top, left) => `translate3d(${left}px, ${top}px, 0)`
        )
      : transform,
    display,
    scale: scaleSpring,
    transformOrigin: 'bottom center',
  };

  //console.log(id, styles);

  return styles;
};

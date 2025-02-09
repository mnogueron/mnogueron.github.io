import React, {useMemo, useRef, useState} from 'react';
import {Flex, Text} from '@chakra-ui/react';
import Racket from '@/components/Racket';
import {ABOUT_ME_DOTS} from '@/constants/data';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import ShuttleAnimator, {
  ShuttleAnimatorRef,
} from '@/components/ShuttleAnimator';

type AboutMeProps = {
  shuttleStartPosition?: {
    x: number;
    y: number;
  };
};

const AboutMe = ({shuttleStartPosition}: AboutMeProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const dotId = useRef<string>(null);
  // TODO just get data when clicking on the dot
  const {modalTitle, modalText} = useMemo(() => {
    const dotData = ABOUT_ME_DOTS.find(d => d.id === dotId.current);
    if (!dotData) {
      return {
        modalTitle: undefined,
        modalText: undefined,
      };
    }
    return {
      modalTitle: dotData.title,
      modalText: dotData.text,
    };
  }, [dotId.current]);

  const shuttleAnimatorRef = useRef<ShuttleAnimatorRef>(null);
  const position = {
    bottom: 496.6812744140625,
    height: 63.340728759765625,
    left: 436.41107177734375,
    right: 499.7518310546875,
    top: 433.3405456542969,
    width: 63.34075927734375,
    x: 436.41107177734375,
    y: 433.3405456542969,
  };
  const [shuttleEndPosition, setShuttleEndPosition] = useState({
    x: position.x + position.width / 2,
    y: position.y + position.height / 2,
  });

  const handleDotClick = (e: React.UIEvent<SVGCircleElement>, id: string) => {
    // TODO cancel previous callback if not finished
    dotId.current = id;

    if (!containerRef.current || !shuttleAnimatorRef.current) {
      return;
    }

    const parentPosition = containerRef.current.getBoundingClientRect();
    const position = (e.target as SVGCircleElement).getBoundingClientRect();

    if (shuttleAnimatorRef.current.shuttleElement) {
      shuttleAnimatorRef.current.shuttleElement.style.display = 'block';
    }
    shuttleAnimatorRef.current.springApi.stop(true);
    shuttleAnimatorRef.current.springApi.start({
      from: {offsetDistance: '0%'},
      to: {offsetDistance: '100%'},
      onRest: ({cancelled}) => {
        if (!cancelled) {
          console.log('Open modal');
          setOpen(true);
          if (shuttleAnimatorRef.current?.shuttleElement) {
            shuttleAnimatorRef.current.shuttleElement.style.display = 'none';
          }
        }
      },
    });
    setShuttleEndPosition({
      x: position.x - parentPosition.x + position.width / 2,
      y: position.y - parentPosition.y + position.height / 2,
    });
  };

  return (
    <>
      <Flex
        ref={containerRef}
        justifyContent="center"
        height="100%"
        overflow="hidden"
        bg="screen.aboutMe"
      >
        <Racket
          height="90%"
          top="20%"
          position="absolute"
          dots={ABOUT_ME_DOTS}
          onDotClick={handleDotClick}
        />
        <DialogRoot
          placement={{base: 'top', md: 'center'}}
          motionPreset="slide-in-top"
          open={open}
          onOpenChange={e => setOpen(e.open)}
          closeOnInteractOutside={true} // TODO correctly handle outside interaction
        >
          <DialogContent mx={4} portalled={false} embedded={true}>
            <DialogHeader>
              <DialogTitle>{modalTitle}</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Text as="p" whiteSpace="pre-wrap" textAlign="justify">
                {modalText}
              </Text>
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        </DialogRoot>
      </Flex>

      {/* TODO handle how to get the start position */}
      <ShuttleAnimator
        ref={shuttleAnimatorRef}
        positionStart={{
          x: (shuttleStartPosition?.x || 0) + 16,
          y: (shuttleStartPosition?.y || 0) + 16,
        }}
        positionEnd={shuttleEndPosition}
        height="32px"
        width="32px"
        display="none"
        animate={false}
        pointerEvents="none"
      />
    </>
  );
};

AboutMe.appTitle = 'About me';

AboutMe.preferredRatio = 0.8;
AboutMe.preferredRatioMobile = 0.7;
AboutMe.maxApplicationHeight = 900;
AboutMe.minMobileRatio = 0.55;

export default AboutMe;

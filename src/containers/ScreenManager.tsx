'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenType} from '@/containers/types';
import {useRouter} from 'next/router';
import {Box, Flex, HStack, Text} from '@chakra-ui/react';
import Shuttle from '@/components/Shuttle';
import Menu from '@/components/Menu';
import Net from '@/components/Net';
import Timeline from '@/components/Timeline';
import Court from '@/components/Court';
import Racket from '@/components/Racket';
import ExperienceCard from '@/components/ExperienceCard';
import {ABOUT_ME_DOTS, EXPERIENCES} from '@/constants/data';
import LandingTextAnimator from '@/components/LandingTextAnimator';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import WipMenu from '@/components/WipMenu';
import useMeasure from 'react-use-measure';
import ShuttleAnimator, {
  ShuttleAnimatorRef,
} from '@/components/ShuttleAnimator';
import Window from '@/components/Window';

const ScreenManager = () => {
  // TODO create APP context with ids + location on screen + state, etc...
  const [showAboutMe, setShowAboutMe] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null!);
  const [screen, setScreen] = useState<ScreenType>(() => {
    const locationHash = window.location.hash.replace('#', '');
    return (locationHash as ScreenType) || ScreenType.LANDING; // TODO fix shady cast
  });
  const router = useRouter();
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
  const [shuttleRef, {x: shuttleX, y: shuttleY}] = useMeasure();
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

  const backgroundColor = useMemo(() => {
    switch (screen) {
      case ScreenType.LANDING:
        return 'screen.landing';
      case ScreenType.EXPERIENCES:
        return 'screen.experiences';
      case ScreenType.PROJECTS:
        return 'screen.projects';
      case ScreenType.ABOUT_ME:
        return 'screen.aboutMe';
    }
  }, [screen]);

  useEffect(() => {
    document.body.setAttribute('data-screen', screen);
  }, [screen]);

  useEffect(() => {
    const onHashChangeComplete = () => {
      const locationHash = window.location.hash.replace('#', '');
      console.log(locationHash || ScreenType.LANDING);
      setScreen((locationHash as ScreenType) || ScreenType.LANDING); // TODO fix shady cast
    };

    router.events.on('hashChangeComplete', onHashChangeComplete);

    return () => {
      router.events.off('hashChangeComplete', onHashChangeComplete);
    };
  }, [router.events]);

  const handleFeatherClick = (id: ScreenType) => {
    //setScreen(id);
    if (id === ScreenType.ABOUT_ME) {
      setShowAboutMe(true);
      router.push('/');
      return;
    }
    router.push(`/#${id}`);
  };

  // TODO pop history until reaching the last '/'
  const handleMenuShuttleClick = () => {
    router.push('/');
  };

  const handleCourtClick = () => {
    // TODO handle court click
  };

  const handleDotClick = (e: React.UIEvent<SVGCircleElement>, id: string) => {
    // TODO cancel previous callback if not finished
    dotId.current = id;
    const position = (e.target as SVGCircleElement).getBoundingClientRect();
    shuttleAnimatorRef.current?.springApi.start({
      from: {offsetDistance: '0%'},
      to: {offsetDistance: '100%'},
      onResolve: () => {
        setOpen(true);
      },
    });
    setShuttleEndPosition({
      x: position.x + position.width / 2,
      y: position.y + position.height / 2,
    });
  };

  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      top={0}
      width="100%"
      backgroundColor="screen.landing"
      transition="background-color 500ms ease" // TODO sync with over animations
    >
      <Box
        display={screen === ScreenType.LANDING ? 'block' : 'none'}
        height="100%"
      >
        {/*<VStack alignItems="initial" maxW="xl" gap={2}>
        <Heading as="h1" size="6xl">
          Matthieu NOGUERON
        </Heading>
        <VStack alignItems="initial" gap={4}>
          <Heading as="h2" size="xl" fontWeight="medium">
            Frontend software engineer and technical lead
          </Heading>
          <Heading as="h3" size="md" fontWeight="medium">
            I help teams stay up to date with the latest technical stacks and
            support developers in their learning journey
          </Heading>
        </VStack>
      </VStack>*/}
        <LandingTextAnimator />
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Shuttle height="54dvh" onFeatherClick={handleFeatherClick} />
        </Flex>
      </Box>

      <Box display={screen === ScreenType.EXPERIENCES ? 'block' : 'none'}>
        <Box
          ref={scrollContainerRef}
          position="absolute"
          right={0}
          left={0}
          bottom={0}
          top={0}
          width="100%"
          overflowX="scroll"
        >
          <Box position="absolute" top="50%" transform="translateY(-50%)">
            <Flex
              position="relative"
              overflow="hidden"
              height={{base: '60dvh', md: '40dvh'}}
            >
              <Net
                height={{base: '60dvh', md: '40dvh'}}
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                zIndex={-1}
              />
              <HStack
                px={{base: 10, md: 32}}
                gap={{base: 16, md: 32}}
                width="100%"
              >
                {EXPERIENCES.map(({id, dateLabel, title, content}) => (
                  <ExperienceCard
                    key={id}
                    dateLabel={dateLabel}
                    title={title}
                    content={content}
                  />
                ))}
              </HStack>
            </Flex>
          </Box>
        </Box>
        <Timeline
          position="absolute"
          right={{base: 2, md: 8}}
          left={{base: 2, md: 8}}
          top={{base: '5dvh', md: '20dvh'}}
          scrollRef={scrollContainerRef}
        />
      </Box>

      <Box display={screen === ScreenType.PROJECTS ? 'block' : 'none'}>
        <Court
          onCourtClick={handleCourtClick}
          height="60vh"
          position="absolute"
          top="50%"
          left={32}
          transform="translateY(-50%)"
          // TODO better align on multiple devices
        />
      </Box>

      <Window
        title="About me"
        position="absolute"
        top={{base: 3, md: 6}}
        left={{base: 3, md: 6}}
        right={{base: 3, md: 6}}
        display={showAboutMe ? 'block' : 'none'}
        containerProps={{bg: 'screen.aboutMe', overflowY: 'auto'}}
        height="90dvh"
        onClose={() => setShowAboutMe(false)}
      >
        {/* TODO bring the racket down */}
        <Flex
          justifyContent="center"
          height="100%"
          pt="calc(35dvh/2)"
          overflow="hidden"
        >
          <Racket
            height="85dvh"
            dots={ABOUT_ME_DOTS}
            onDotClick={handleDotClick}
          />
          <DialogRoot
            placement={{base: 'top', md: 'center'}}
            motionPreset="slide-in-top"
            open={open}
            onOpenChange={e => setOpen(e.open)}
          >
            <DialogContent mx={4}>
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
      </Window>

      <ShuttleAnimator
        ref={shuttleAnimatorRef}
        positionStart={{x: shuttleX + 16, y: shuttleY + 16}}
        positionEnd={shuttleEndPosition}
        height="32px"
        width="32px"
        animate={false}
        display={showAboutMe ? 'block' : 'none'}
        pointerEvents="none"
      />

      {/*TODO add bottom menu*/}

      <WipMenu
        display={screen === ScreenType.LANDING ? 'flex' : 'none'}
        position="absolute"
        right={{base: 3, md: 6}}
        bottom={{base: 3, md: 6}}
      />

      <Flex
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        bg="screen.landing"
        height={16}
        borderTop="1px solid white"
        borderTopRadius={16}
        alignItems="center"
      >
        <Menu
          shuttleRef={shuttleRef}
          onMenuShuttleClick={handleMenuShuttleClick}
          onMenuItemClick={handleFeatherClick}
          screen={screen}
        />
      </Flex>
    </Box>
  );
};

export default ScreenManager;

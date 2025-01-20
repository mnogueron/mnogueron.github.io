import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenType} from '@/containers/types';
import {useRouter} from 'next/router';
import {Box, Flex, HStack} from '@chakra-ui/react';
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

const ScreenManager = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null!);
  const [screen, setScreen] = useState<ScreenType>(() => {
    const locationHash =
      typeof window !== 'undefined'
        ? window.location.hash.replace('#', '')
        : '';
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
    router.push(`/#${id}`);
  };

  // TODO pop history until reaching the last '/'
  const handleMenuShuttleClick = () => {
    router.push('/');
  };

  const handleCourtClick = () => {
    // TODO handle court click
  };

  const handleDotClick = (e: React.UIEvent, id: string) => {
    dotId.current = id;
    setOpen(true);
  };

  return (
    <Box
      position="absolute"
      right={0}
      left={0}
      bottom={0}
      top={0}
      width="100%"
      backgroundColor={backgroundColor}
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
        <LandingTextAnimator position="absolute" top={8} left={8} />
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

      <Box
        display={screen === ScreenType.ABOUT_ME ? 'block' : 'none'}
        height="100%"
      >
        {/* TODO bring the racket down */}
        <Flex
          justifyContent="center"
          height="100%"
          pt="calc(43dvh/2)"
          overflow="hidden"
        >
          <Racket
            height="90dvh"
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
                <p>{modalText}</p>
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          </DialogRoot>
        </Flex>
      </Box>

      <Menu
        display={screen === ScreenType.LANDING ? 'none' : 'flex'}
        position="absolute"
        bottom={6}
        left={6}
        onMenuShuttleClick={handleMenuShuttleClick}
        onMenuItemClick={handleFeatherClick}
        screen={screen}
      />
    </Box>
  );
};

export default ScreenManager;

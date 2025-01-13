import React, {useEffect, useMemo, useRef, useState} from 'react';
import {ScreenType} from '@/containers/types';
import {useRouter} from 'next/router';
import {Box, Flex} from '@chakra-ui/react';
import Shuttle from '@/components/Shuttle';
import Menu from '@/components/Menu';
import Net from '@/components/Net';
import Timeline from '@/components/Timeline';
import Court from '@/components/Court';
import Racket from '@/components/Racket';

const ScreenManager = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null!);
  const [screen, setScreen] = useState<ScreenType>(() => {
    const locationHash = window.location.hash.replace('#', '');
    return (locationHash as ScreenType) || ScreenType.LANDING; // TODO fix shady cast
  });
  const router = useRouter();

  const backgroundColor = useMemo(() => {
    switch (screen) {
      case ScreenType.LANDING:
        return '#29282B';
      case ScreenType.EXPERIENCES:
        return '#E97D30';
      case ScreenType.PROJECTS:
        return '#0C9B8A';
      case ScreenType.ABOUT_ME:
        return '#334858';
    }
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
        <Flex alignItems="center" justifyContent="center" height="100%">
          <Shuttle height="50vh" onFeatherClick={handleFeatherClick} />
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
          <Net
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            width="3840px"
          />
        </Box>
        <Timeline
          position="absolute"
          right={8}
          left={8}
          top="30%"
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
        <Flex alignItems="flex-end" justifyContent="center" height="100%">
          <Racket height="80vh" />
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

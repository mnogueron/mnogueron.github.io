import React, {useRef} from 'react';
import {Box, Flex, HStack} from '@chakra-ui/react';
import Net from '@/applications/Experiences/components/Net';
import ExperienceCard from '@/applications/Experiences/components/ExperienceCard';
import Timeline from '@/applications/Experiences/components/Timeline';
import {relativeSize} from '@/os/AppWindow/utils';
import {EXPERIENCES} from '@/applications/Experiences/data';
import {AppComponent} from '@/applications/types';

const Experiences: AppComponent = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null!);

  return (
    <Flex
      direction="column-reverse"
      bg="screen.experiences"
      height="100%"
      width="100%"
      gap={relativeSize(0.1, 'containerHeight', 64)}
    >
      <Box
        ref={scrollContainerRef}
        position="relative"
        overflowX="scroll"
        flex={1}
        width="100%"
      >
        <Flex
          position="absolute"
          top={0}
          bottom={relativeSize(0.05, 'containerHeight', 64, 32)}
          alignItems="center"
        >
          <Flex
            height="100%"
            maxHeight="600px"
            width="100%"
            position="relative"
            overflow="hidden"
          >
            <Net
              position="absolute"
              height="100%"
              top={0}
              bottom={0}
              left={0}
              right={0}
            />
            <HStack
              alignItems="flex-start"
              justifyContent="flex-start"
              pt={relativeSize(0.1, 'containerHeight')}
              px={relativeSize(0.05, 'containerWidth', 64)}
              gap={relativeSize(0.1, 'containerWidth', 128)}
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
        </Flex>
      </Box>
      <Timeline
        scrollRef={scrollContainerRef}
        pt={relativeSize(0.05, 'containerHeight')}
        px={relativeSize(0.05, 'containerWidth', 64)}
      />
    </Flex>
  );
};

Experiences.config = {
  appTitle: 'Experiences',
  preferredRatio: 1.3,
  preferredRatioMobile: 0.7,
  maxApplicationHeight: 900,
  minMobileRatio: 0.55,
  minWidth: 350,
  minHeight: 450,
};

export default Experiences;

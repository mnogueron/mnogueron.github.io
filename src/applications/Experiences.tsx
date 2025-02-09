import React, {useRef} from 'react';
import {Box, Flex, HStack} from '@chakra-ui/react';
import Net from '@/components/Net';
import {EXPERIENCES} from '@/constants/data';
import ExperienceCard from '@/components/ExperienceCard';
import Timeline from '@/components/Timeline';

const Experiences = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null!);

  return (
    <Box bg="screen.experiences" height="100%" width="100%" overflowX="auto">
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
  );
};

Experiences.appTitle = 'Experiences';

Experiences.preferredRatio = 1.3;
Experiences.preferredRatioMobile = 0.7;
Experiences.maxApplicationHeight = 900;
Experiences.minMobileRatio = 0.55;

export default Experiences;

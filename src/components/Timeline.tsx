import React from 'react';
import {Box, BoxProps, Flex, Text, VStack} from '@chakra-ui/react';
import {useScroll} from '@react-spring/web';
import Animated from '@/components/Animated';

type TimelineProps = {
  scrollRef: React.RefObject<HTMLDivElement>;
} & BoxProps;

const Timeline = ({scrollRef, ...props}: TimelineProps) => {
  const {scrollXProgress} = useScroll({
    container: scrollRef,
    default: {
      immediate: true,
    },
  });

  return (
    <Box {...props}>
      <Flex justifyContent="space-between" px={6} color="white">
        <VStack>
          <Text fontWeight="bold">2017</Text>
          <Box height={9} width="2px" backgroundColor="white" />
        </VStack>
        <VStack>
          <Text fontWeight="bold">Now</Text>
          <Box height={9} width="2px" backgroundColor="white" />
        </VStack>
      </Flex>

      <Box position="relative">
        <Box width="100%" height="2px" backgroundColor="white" />

        <Animated.Box
          position="absolute"
          bottom="-18px"
          style={{
            left: scrollXProgress.to(scrollP => {
              // TODO constrain to the inside of the timeline
              return `${scrollP * 100}%`;
            }),
          }}
        >
          <svg
            width="47"
            height="38"
            viewBox="0 0 47 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_21_352)">
              <path
                d="M3.81941 31.5267L1.78534 35.819C1.52636 36.3633 1.61539 37.0057 2.01195 37.4518C2.41121 37.9006 3.02359 38.0493 3.57393 37.8249L24.554 29.3048L24.554 26.1067L3.81941 31.5267ZM34.29 12.6715L34.29 25.3184L36.1973 25.3155V12.6687L34.29 12.6715ZM46.3271 18.9949C46.3271 15.505 43.6025 12.6715 40.2465 12.6715L38.1045 12.6715L38.1045 25.3183L40.2465 25.3183C43.6052 25.3155 46.3271 22.4849 46.3271 18.9949ZM26.4612 25.6101V28.5333L32.3827 26.1291L32.3827 24.0643L26.4612 25.6101ZM0.398722 13.6338L3.32574 18.013L24.5567 18.013L24.5567 13.9508L3.20703 8.37362L0.463468 11.9393C0.276341 12.1757 0.168728 12.4693 0.157038 12.7752C0.145348 13.0812 0.230222 13.3827 0.398722 13.6338ZM3.57391 0.187408C3.30787 0.077699 3.01605 0.0546339 2.73712 0.121266C2.45818 0.187897 2.20529 0.341085 2.01195 0.560532C1.81862 0.776209 1.69332 1.04819 1.65281 1.34001C1.61231 1.63184 1.65855 1.92956 1.78534 2.19329L3.81941 6.48557L24.554 11.9056V8.70747L3.57391 0.187408ZM26.4613 9.48457L26.4613 12.4078L32.38 13.9564L32.38 11.8916L26.4613 9.48457ZM0.460764 26.0758L3.20434 29.6415L24.554 24.0643L24.554 20.0021L3.32303 20.0021L0.396027 24.3813C0.0534183 24.8891 0.0803873 25.5905 0.460764 26.0758ZM26.4612 14.4502L26.4613 18.013H32.38V15.9988L26.4612 14.4502ZM32.3827 22.0164L32.3827 20.0021L26.464 20.0021L26.4639 23.565L32.3827 22.0164Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_21_352">
                <rect
                  width="38"
                  height="46.3324"
                  fill="white"
                  transform="matrix(0 1 -1 0 46.4082 0)"
                />
              </clipPath>
            </defs>
          </svg>
        </Animated.Box>
      </Box>
    </Box>
  );
};

export default Timeline;

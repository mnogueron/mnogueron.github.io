import React from 'react';
import {Link, Text, VStack} from '@chakra-ui/react';
import BUILD_DATA from '@/constants/buildData.json';
import {AppComponent} from '@/applications/types';

const About: AppComponent = () => {
  return (
    <VStack
      gap={2}
      px={2}
      py={5}
      overflowY="auto"
      height="100%"
      justifyContent="center"
    >
      <Text as="p" whiteSpace="pre-wrap" textAlign="center">
        {`This website is currently in a WIP state.

I recently decided to totally rewrite my previous portfolio and do something that matches a little bit more who I am. What you will find in there is a badminton themed technical website that contains my experiences, my projects and a little bit more about me.

Follow along as I add more and more UI and technical details to this portfolio!

Last update: ${new Date(BUILD_DATA.lastUpdatedAt).toDateString()}`}
      </Text>
      <Link
        variant="underline"
        href="https://github.com/mnogueron/mnogueron.github.io"
        colorPalette="teal"
      >
        Github repo
      </Link>
    </VStack>
  );
};

About.config = {
  appTitle: 'About this app',
  disableResize: true,

  // TODO handle strict window size
  preferredRatio: 0.8,
  preferredRatioMobile: 0.7,
  maxApplicationHeight: 900,
  minMobileRatio: 0.55,

  // TODO handle resizing
  getStaticBox: (container: {width: number; height: number}) => {
    let width = 500;
    let height = 400;
    if (container.width < 800) {
      height = Math.min(450, container.height - 2 * 12);
      width = container.width - 2 * 12;
    }
    return {
      top: (container.height - height) / 2,
      left: (container.width - width) / 2,
      width,
      height,
    };
  },
};

export default About;

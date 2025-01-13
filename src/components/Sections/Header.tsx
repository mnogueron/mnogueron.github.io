import React from 'react';
import {Box, Flex, Heading, VStack} from '@chakra-ui/react';

const Header = () => {
  return (
    /*<Flex as="header" h="100vh" alignItems="center" backgroundSize="cover" backgroundColor="gray.800" backgroundImage="linear-gradient(250deg,rgba(130,201,30,0),#062343 70%), url(/images/background.jpg)">*/
    <Flex
      as="header"
      h="100vh"
      alignItems="center"
      backgroundSize="cover"
      backgroundColor="gray.800"
      backgroundImage="url(/images/background.jpg)"
    >
      <Box maxW="5xl" mx={64} flex={1}>
        <Heading size="md">Hi, my name is</Heading>
        <Heading size="5xl">Matthieu Nogueron</Heading>
        {/*TODO add animated text*/}
        {/*<Heading size="3xl">I'm a frontend technical lead...</Heading>*/}
        <VStack gap={2} alignItems="initial" mt={4}>
          <Heading size="xl" whiteSpace="pre-wrap">
            <b>Frontend technical lead with 8 years in the industry</b> and 4
            years international experience in Sweden.
          </Heading>
          <Heading size="xl" whiteSpace="pre-wrap">
            I love mentoring junior and more advanced developers to help them
            reach their potential and lead big scale technical / architectural
            decisions.
          </Heading>
          <Heading size="xl" whiteSpace="pre-wrap" mt={8}>
            <b>
              As of December 2024, this website is undergoing an entire redo
              with NextJS and ChakraUI.
            </b>
          </Heading>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Header;

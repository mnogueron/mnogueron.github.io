import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Heading,
  Icon,
} from '@chakra-ui/react';
import {FaGithub, FaLinkedin, FaPaperPlane} from 'react-icons/fa6';
import {TbCircleLetterMFilled} from 'react-icons/tb';

type SocialLinkProps = {
  href: string;
  icon: React.ReactElement;
};

const SocialLink = ({href, icon}: SocialLinkProps) => {
  return (
    <Link href={href}>
      <IconButton rounded="full" variant="ghost">
        {icon}
      </IconButton>
    </Link>
  );
};

// TODO convert to DS
const Footer = () => {
  return (
    <Box as="footer" borderTopWidth={1} borderTopColor="gray.600">
      <Box maxW="5xl" py={8} px={4} margin="auto">
        {/*TODO add logo*/}
        <Flex justifyContent="space-between" alignItems="center">
          <HStack gap={2}>
            <Icon fontSize="28px">
              <TbCircleLetterMFilled />
            </Icon>
            <Heading size="sm">mnogueron</Heading>
          </HStack>
          <HStack>
            <SocialLink
              href="https://github.com/mnogueron/"
              icon={<FaGithub />}
            />
            <SocialLink
              href="https://www.linkedin.com/in/matthieu-nogueron/"
              icon={<FaLinkedin />}
            />
            <SocialLink
              href="mailto:matthieu.nogueron@gmail.com"
              icon={<FaPaperPlane />}
            />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
};

export default Footer;

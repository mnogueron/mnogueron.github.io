import React from 'react';
import {Box, Center, Text} from '@chakra-ui/react';

type AppShortcutProps = {
  id: string;
  onClick: (id: string) => void;
};

const AppShortcut = ({id, onClick}: AppShortcutProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Box p={1} className="group" onClick={handleClick}>
      <Center
        as="button"
        width={{base: 9, md: 11}}
        height={{base: 9, md: 11}}
        borderRadius="lg"
        bg="white"
        cursor="pointer"
        transition="height 150ms ease-out, width 150ms ease-out" // TODO improve animation
        _groupHover={{
          width: {base: 12, md: 14},
          height: {base: 12, md: 14},
        }}
      >
        <Text color="gray.800">{id.charAt(0).toUpperCase()}</Text>
      </Center>
    </Box>
  );
};

export default AppShortcut;

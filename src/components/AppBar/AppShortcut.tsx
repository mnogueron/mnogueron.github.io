import React from 'react';
import {Center, Text} from '@chakra-ui/react';

type AppShortcutProps = {
  id: string;
  onClick: (id: string) => void;
};

const AppShortcut = ({id, onClick}: AppShortcutProps) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <Center
      as="button"
      width={12}
      height={12}
      borderRadius="lg"
      bg="white"
      onClick={handleClick}
      cursor="pointer"
    >
      <Text color="gray.800">{id.charAt(0).toUpperCase()}</Text>
    </Center>
  );
};

export default AppShortcut;

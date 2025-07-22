import React, {useMemo} from 'react';
import {Flex} from '@chakra-ui/react';
import {useWindowAppContext} from '@/contexts/WindowAppProvider';
import AppShortcut from '@/components/AppBar/AppShortcut';

const AppController = () => {
  const {applications, focusApplication} = useWindowAppContext();
  const ids = useMemo(() => {
    return Object.values(applications).map(a => a.id);
  }, [applications]);

  const handleAppShortcutClick = (id: string) => {
    focusApplication(id);
  };

  return (
    <Flex gap={4} flex={1}>
      {ids.map(id => (
        <AppShortcut key={id} id={id} onClick={handleAppShortcutClick} />
      ))}
    </Flex>
  );
};

export default AppController;

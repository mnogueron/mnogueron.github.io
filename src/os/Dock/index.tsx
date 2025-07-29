import React, {useMemo} from 'react';
import {Flex, Separator} from '@chakra-ui/react';
import AppLauncher from '@/os/Dock/AppLauncher';
import AppShortcut from '@/os/Dock/AppShortcut';
import {DockContainer} from '@/os/Dock/components/DockContainer';
import {useApplicationsStore} from '@/os/store';

const Dock = () => {
  const applications = useApplicationsStore(state => state.applications);
  const focusApplication = useApplicationsStore(
    state => state.focusApplication
  );
  const ids = useMemo(() => {
    return Object.values(applications).map(a => a.id);
  }, [applications]);

  const handleAppShortcutClick = (id: string) => {
    focusApplication(id);
  };

  return (
    <DockContainer>
      <AppLauncher />
      <Separator orientation="vertical" borderColor="menubar.border" />
      <Flex gap={0} flex={1} alignItems="flex-end">
        {ids.map(id => (
          <AppShortcut key={id} id={id} onClick={handleAppShortcutClick} />
        ))}
      </Flex>
    </DockContainer>
  );
};

export default Dock;

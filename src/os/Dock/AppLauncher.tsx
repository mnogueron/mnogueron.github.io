import React, {useState} from 'react';
import {ApplicationId} from '@/applications/types';
import {Box, BoxProps, IconButton, Text, VStack} from '@chakra-ui/react';
import Logo from '@/components/icons/Logo';
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTrigger,
} from '@/components/ui/popover';
import {useApplicationsStore} from '@/os/store';

type MenuItem = {
  id: string;
  title: string;
  meta: {
    isApplication: boolean;
    appId: ApplicationId;
  };
};

// TODO improve the launcher
const AppMenuItems: MenuItem[] = [
  {
    id: ApplicationId.ABOUT_ME,
    title: 'About me',
    meta: {
      isApplication: true,
      appId: ApplicationId.ABOUT_ME,
    },
  },
  {
    id: ApplicationId.EXPERIENCES,
    title: 'Experiences',
    meta: {
      isApplication: true,
      appId: ApplicationId.EXPERIENCES,
    },
  },
  {
    id: ApplicationId.PROJECTS,
    title: 'Projects',
    meta: {
      isApplication: true,
      appId: ApplicationId.PROJECTS,
    },
  },
  {
    id: ApplicationId.ABOUT_APP,
    title: 'About - WIP',
    meta: {
      isApplication: true,
      appId: ApplicationId.ABOUT_APP,
    },
  },
];

type AppMenuItemProps = {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
} & Omit<BoxProps, 'onClick'>;

const AppMenuItem = ({item, onClick, ...rest}: AppMenuItemProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(item);
    }
  };

  return (
    <Box
      py={{base: 2, md: 3}}
      px={{base: 2, md: 4}}
      cursor="pointer"
      _hover={{bg: 'menubar.item.hover'}}
      borderRadius={8}
      onClick={handleClick}
      {...rest}
    >
      <Text fontSize="sm" fontWeight="semibold">
        {item.title}
      </Text>
    </Box>
  );
};

const AppLauncher = () => {
  const openApplication = useApplicationsStore(state => state.openApplication);
  const [open, setOpen] = useState(false);

  const handleMenuClick = (item: MenuItem) => {
    if (item.meta.isApplication) {
      openApplication(item.meta.appId);
    }
    setOpen(false);
  };

  return (
    <PopoverRoot
      // TODO improve spacing to match with menuBar
      positioning={{offset: {mainAxis: 18}}}
      open={open}
      onOpenChange={e => setOpen(e.open)}
    >
      <PopoverTrigger asChild={true}>
        <IconButton
          colorPalette="gray"
          variant="solid"
          size={{base: 'sm', md: 'lg'}}
          rounded="full"
          m={1}
        >
          <Logo width={8} height={8} strokeWidth="14" />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverBody p={3}>
          <VStack gap={1} alignItems="initial">
            {AppMenuItems.map(item => (
              <AppMenuItem
                key={item.id}
                item={item}
                onClick={handleMenuClick}
              />
            ))}
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </PopoverRoot>
  );
};

export default AppLauncher;

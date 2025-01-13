import React, {useMemo, useState} from 'react';
import {Box, HStack, Icon, StackProps, Text, VStack} from '@chakra-ui/react';
import ShuttleCompact from '@/components/ShuttleCompact';
import {useSpring} from '@react-spring/web';
import useMeasure from 'react-use-measure';
import {FaChevronRight} from 'react-icons/fa6';
import Animated from '@/components/Animated';
import {ScreenType} from '@/containers/types';

type MenuProps = {
  onMenuShuttleClick: () => void;
  onMenuItemClick: (id: ScreenType) => void;
  screen: ScreenType;
} & StackProps;

type MenuItemProps = {
  text: string;
  active?: boolean;
} & StackProps;

const MenuItem = ({text, active, ...props}: MenuItemProps) => {
  return (
    <HStack gap={1} {...props} className="group">
      <Icon
        display={active ? 'block' : 'none'}
        _groupHover={{display: 'block'}}
      >
        <FaChevronRight />
      </Icon>
      <Text
        fontWeight="bold"
        _groupHover={{
          fontWeight: 'extrabold',
        }}
      >
        {text}
      </Text>
    </HStack>
  );
};

const Menu = ({
  screen,
  onMenuShuttleClick,
  onMenuItemClick,
  ...props
}: MenuProps) => {
  const [isOpen, setOpen] = useState(false);
  const [ref, {height: viewHeight}] = useMeasure();
  const screenLabel = useMemo(() => {
    switch (screen) {
      case ScreenType.LANDING:
        return '';
      case ScreenType.ABOUT_ME:
        return 'About me';
      case ScreenType.EXPERIENCES:
        return 'Experiences';
      case ScreenType.PROJECTS:
        return 'Projects';
    }
  }, [screen]);
  const options = useMemo(() => {
    switch (screen) {
      case ScreenType.LANDING:
        return [];
      case ScreenType.ABOUT_ME:
        return [
          {
            label: 'Experiences',
            onClick: () => onMenuItemClick(ScreenType.EXPERIENCES),
          },
          {
            label: 'Projects',
            onClick: () => onMenuItemClick(ScreenType.PROJECTS),
          },
        ];
      case ScreenType.EXPERIENCES:
        return [
          {
            label: 'About me',
            onClick: () => onMenuItemClick(ScreenType.ABOUT_ME),
          },
          {
            label: 'Projects',
            onClick: () => onMenuItemClick(ScreenType.PROJECTS),
          },
        ];
      case ScreenType.PROJECTS:
        return [
          {
            label: 'Experiences',
            onClick: () => onMenuItemClick(ScreenType.EXPERIENCES),
          },
          {
            label: 'About me',
            onClick: () => onMenuItemClick(ScreenType.ABOUT_ME),
          },
        ];
    }
  }, [onMenuItemClick, screen]);
  const {height, opacity, y} = useSpring({
    from: {height: 0, opacity: 0, y: 0},
    to: {
      height: isOpen ? viewHeight : 0,
      opacity: isOpen ? 1 : 0,
      y: isOpen ? 0 : 20,
    },
  });
  return (
    <HStack {...props} alignItems="flex-end">
      <Box p={2} onClick={onMenuShuttleClick} cursor="pointer">
        <ShuttleCompact height="32px" width="32px" />
      </Box>
      <VStack
        alignItems="initial"
        py={3}
        onMouseLeave={() => {
          console.log('close');
          setOpen(false);
        }}
      >
        <Animated.Box
          style={{
            opacity,
            height: isOpen ? 'auto' : height,
          }}
        >
          <Animated.VStack ref={ref} alignItems="initial" style={{y}}>
            {options.map(({label, onClick}) => (
              <MenuItem key={label} text={label} onClick={onClick} />
            ))}
          </Animated.VStack>
        </Animated.Box>
        <MenuItem
          active={!isOpen}
          zIndex={1000}
          onClick={() => {
            setOpen(true);
          }}
          onMouseEnter={() => {
            setOpen(true);
          }}
          text={screenLabel}
        />
      </VStack>
    </HStack>
  );
};

export default Menu;

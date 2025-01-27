import React, {useMemo} from 'react';
import {
  Box,
  HStack,
  Icon,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
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
  shuttleRef: React.Ref<HTMLOrSVGElement>;
} & StackProps;

type MenuItemProps = {
  id?: string;
  text: string;
  active?: boolean;
  onClick: (id?: string) => void;
} & Omit<StackProps, 'onClick'>;

const MenuItem = ({id, text, active, onClick, ...props}: MenuItemProps) => {
  const handleClick = () => {
    onClick(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onClick(id);
    }
  };

  return (
    <HStack
      gap={1}
      py={1}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      {...props}
      className="group"
      cursor="pointer"
    >
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

// TODO debug weird behaviour when focused
const Menu = ({
  screen,
  onMenuShuttleClick,
  onMenuItemClick,
  shuttleRef,
  ...props
}: MenuProps) => {
  const {open, onOpen, onToggle, onClose} = useDisclosure();
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
            id: 'experiences',
            label: 'Experiences',
            onClick: () => onMenuItemClick(ScreenType.EXPERIENCES),
          },
          {
            id: 'projects',
            label: 'Projects',
            onClick: () => onMenuItemClick(ScreenType.PROJECTS),
          },
        ];
      case ScreenType.EXPERIENCES:
        return [
          {
            id: 'about_me',
            label: 'About me',
            onClick: () => onMenuItemClick(ScreenType.ABOUT_ME),
          },
          {
            id: 'projects',
            label: 'Projects',
            onClick: () => onMenuItemClick(ScreenType.PROJECTS),
          },
        ];
      case ScreenType.PROJECTS:
        return [
          {
            id: 'experiences',
            label: 'Experiences',
            onClick: () => onMenuItemClick(ScreenType.EXPERIENCES),
          },
          {
            id: 'about_me',
            label: 'About me',
            onClick: () => onMenuItemClick(ScreenType.ABOUT_ME),
          },
        ];
    }
  }, [onMenuItemClick, screen]);

  const handleMenuItemClick = (id?: string) => {
    switch (id) {
      case 'about_me':
        onMenuItemClick(ScreenType.ABOUT_ME);
        break;
      case 'experiences':
        onMenuItemClick(ScreenType.EXPERIENCES);
        break;
      case 'projects':
        onMenuItemClick(ScreenType.PROJECTS);
        break;
      default:
        break;
    }
    onClose();
  };
  const {height, opacity, y} = useSpring({
    from: {height: 0, opacity: 0, y: 0},
    to: {
      height: open ? viewHeight : 0,
      opacity: open ? 1 : 0,
      y: open ? 0 : 20,
    },
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onToggle();
    }
  };

  return (
    <HStack
      {...props}
      alignItems="flex-end"
      gap={{base: 0, md: 1}}
      overflow="hidden"
    >
      <Box p={2} onClick={onMenuShuttleClick} cursor="pointer">
        <ShuttleCompact ref={shuttleRef} height="32px" width="32px" />
      </Box>
      {options.length > 0 && (
        <VStack
          alignItems="initial"
          py={2}
          gap={{base: 0, md: 1}}
          onMouseLeave={onClose}
          flexDirection="column-reverse"
        >
          <MenuItem
            role="button"
            active={!open}
            tabIndex={0}
            zIndex={1000}
            onKeyDown={handleKeyDown}
            onClick={onOpen}
            onMouseEnter={onOpen}
            text={screenLabel}
          />
          <Animated.Box
            style={{
              opacity,
              height: open ? 'auto' : height,
            }}
          >
            <Animated.VStack
              ref={ref}
              alignItems="initial"
              style={{y}}
              gap={{base: 0, md: 1}}
              flexDirection="column-reverse"
            >
              {options.map(({id, label}) => (
                <MenuItem
                  id={id}
                  key={label}
                  text={label}
                  onClick={handleMenuItemClick}
                  tabIndex={0}
                />
              ))}
            </Animated.VStack>
          </Animated.Box>
        </VStack>
      )}
    </HStack>
  );
};

export default Menu;

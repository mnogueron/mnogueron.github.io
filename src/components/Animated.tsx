import {animated} from '@react-spring/web';
import {Box, HStack, ListItem, Stack, Text, VStack} from '@chakra-ui/react';

const Animated = {
  Box: animated(Box),
  VStack: animated(VStack),
  HStack: animated(HStack),
  Stack: animated(Stack),
  Text: animated(Text),
  ListItem: animated(ListItem),
};

export default Animated;

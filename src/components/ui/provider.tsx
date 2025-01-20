'use client';

import {ChakraProvider} from '@chakra-ui/react';
import {ColorModeProvider, type ColorModeProviderProps} from './color-mode';
import {system} from '@/theme';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
      {/* TODO drop forced dark mode once support is implemented */}
      <ColorModeProvider forcedTheme="dark" {...props} />
    </ChakraProvider>
  );
}

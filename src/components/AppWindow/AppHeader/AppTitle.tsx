import {Text} from '@chakra-ui/react';
import React from 'react';

type AppTitleProps = {
  title?: string;
};

const AppTitle = ({title}: AppTitleProps) => {
  return (
    <Text pointerEvents="none" fontSize="xs" userSelect="none">
      {title}
    </Text>
  );
};

export default AppTitle;

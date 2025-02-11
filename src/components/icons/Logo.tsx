import React from 'react';
import {chakra, HTMLChakraProps} from '@chakra-ui/react';

type LogoProps = Partial<HTMLChakraProps<'svg'>>;

const Logo = (props: LogoProps) => {
  return (
    <chakra.svg
      viewBox="0 0 512 512"
      fill="none"
      stroke="black"
      strokeWidth="10.4"
      {...props}
    >
      <rect
        x="196.889"
        y="156.095"
        width="239.2"
        height="52"
        fill="#7294AD"
        fillOpacity="0.5"
        rx="26"
        transform="rotate(120 196.889 156.095)"
      />
      <rect
        x="171.509"
        y="130.37"
        width="239.2"
        height="52"
        fill="#7294AD"
        fillOpacity="0.5"
        rx="26"
        transform="rotate(60 171.509 130.37)"
      />
      <rect
        x="383.612"
        y="155.263"
        width="239.2"
        height="51.9999"
        fill="#7294AD"
        fillOpacity="0.5"
        rx="26"
        transform="rotate(120 383.612 155.263)"
      />
      <rect
        x="357.897"
        y="129.888"
        width="239.2"
        height="52"
        fill="#E97D30"
        fillOpacity="0.5"
        rx="26"
        transform="rotate(60 357.897 129.888)"
      />
    </chakra.svg>
  );
};

export default Logo;

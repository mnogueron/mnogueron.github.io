import React, {useMemo, useState} from 'react';
import {chakra, HTMLChakraProps} from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';

type RacketProps = {
  dots: {
    id: string;
    variant: 'light' | 'medium' | 'full';
    cx: number;
    cy: number;
  }[];
  onDotClick: (id: string) => void;
} & Partial<HTMLChakraProps<'svg'>>;
type DotProps = {
  variant: 'light' | 'medium' | 'full';
  onClick: (id: string) => void;
} & Partial<Omit<HTMLChakraProps<'path'>, 'onClick'>>;

// TODO propagate original event to keep track of the location on screen
const Dot = ({variant, onClick, ...props}: DotProps) => {
  const handleClick = () => {
    if (onClick && props.id) {
      onClick(props.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleClick();
    }
  };

  const variantProps = useMemo(() => {
    switch (variant) {
      case 'light':
        return {
          stroke: '#D3D3D3',
          strokeWidth: '1.71',
          _hover: {
            strokeWidth: '3',
            opacity: 1,
          },
          _focusVisible: {
            strokeWidth: '3',
            opacity: 1,
            stroke: 'lightskyblue',
          },
        };
      case 'medium':
        return {
          stroke: '#D3D3D3',
          strokeWidth: '4.28',
          _hover: {
            strokeWidth: '6',
            opacity: 1,
          },
          _focusVisible: {
            strokeWidth: '6',
            opacity: 1,
            stroke: 'lightskyblue',
          },
        };
      case 'full':
        return {
          _hover: {
            opacity: 1,
          },
          _focusVisible: {
            opacity: 1,
            strokeWidth: '6',
            stroke: 'lightskyblue',
          },
        };
    }
  }, [variant]);
  return (
    <chakra.circle
      tabIndex={0}
      fill="white"
      opacity="0.8"
      cursor="pointer"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...variantProps}
      {...props}
      _focus={{
        outline: 'none',
      }}
      role="button"
      r="25"
    />
  );
};

const Racket = ({dots, onDotClick, ...props}: RacketProps) => {
  const [open, setOpen] = useState(false);

  const handleDotClick = (id: string) => {
    onDotClick(id);
    setOpen(true);
  };

  return (
    <>
      <chakra.svg
        width="440"
        height="871"
        viewBox="0 0 440 871"
        fill="none"
        {...props}
      >
        <path d="M106.231 48.1274H336.415" stroke="white" strokeWidth="0.66" />
        <path d="M84.6514 67.7397H355.379" stroke="white" strokeWidth="0.66" />
        <path d="M370.42 88.6841H67.6494" stroke="white" strokeWidth="0.66" />
        <path d="M384.153 109.597H51.9541" stroke="white" strokeWidth="0.66" />
        <path d="M44.1074 129.851H399.193" stroke="white" strokeWidth="0.66" />
        <path d="M408.348 151.461H36.2607" stroke="white" strokeWidth="0.66" />
        <path d="M416.195 170.414H27.7588" stroke="white" strokeWidth="0.66" />
        <path d="M421.426 191.339H21.2188" stroke="white" strokeWidth="0.66" />
        <path d="M16.6426 210.958H424.043" stroke="white" strokeWidth="0.66" />
        <path d="M426.004 231.235H14.0264" stroke="white" strokeWidth="0.66" />
        <path d="M8.79492 252.149H429.274" stroke="white" strokeWidth="0.66" />
        <path d="M433.198 271.125H8.14062" stroke="white" strokeWidth="0.66" />
        <path d="M6.17969 293.353H433.852" stroke="white" strokeWidth="0.66" />
        <path d="M433.198 311.663H6.83398" stroke="white" strokeWidth="0.66" />
        <path d="M8.79492 333.897H430.582" stroke="white" strokeWidth="0.66" />
        <path d="M431.889 354.18H11.4102" stroke="white" strokeWidth="0.66" />
        <path d="M17.9502 374.44H426.004" stroke="white" strokeWidth="0.66" />
        <path d="M420.119 394.718H17.9512" stroke="white" strokeWidth="0.66" />
        <path d="M27.7588 414.984H411.618" stroke="white" strokeWidth="0.66" />
        <path d="M404.425 435.256H40.1846" stroke="white" strokeWidth="0.66" />
        <path d="M57.8398 461.395H388.076" stroke="white" strokeWidth="0.66" />
        <path
          d="M404.425 151.449L411.618 406.483"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M388.729 116.791L393.307 448.988"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M369.766 83.44L377.613 475.145"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M354.065 63.8224L357.988 497.379"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M335.762 48.1277L339.685 513.074"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M316.798 33.0876L319.413 523.538"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M299.801 21.9709L301.764 532.693"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M282.134 14.1234L282.788 537.923"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M262.521 8.89209L265.79 543.809"
          stroke="white"
          strokeWidth="0.66"
        />
        <path d="M245.524 6.27679V543.155" stroke="white" strokeWidth="0.66" />
        <path d="M228.517 6.9303V546.425" stroke="white" strokeWidth="0.66" />
        <path d="M211.526 6.92999V545.77" stroke="white" strokeWidth="0.66" />
        <path d="M193.876 7.58411V543.809" stroke="white" strokeWidth="0.66" />
        <path d="M176.88 10.2003V539.885" stroke="white" strokeWidth="0.66" />
        <path
          d="M157.916 16.0855L160.531 534"
          stroke="white"
          strokeWidth="0.66"
        />
        <path d="M140.908 21.3171V526.807" stroke="white" strokeWidth="0.66" />
        <path d="M122.592 30.4721V520.268" stroke="white" strokeWidth="0.66" />
        <path d="M103.627 40.9348V511.113" stroke="white" strokeWidth="0.66" />
        <path
          d="M85.9714 69.7077L83.3564 489.533"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M70.9371 91.2878L65.7061 470.569"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M52.6274 118.753L49.3584 440.488"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M34.9527 163.22L29.7217 416.292"
          stroke="white"
          strokeWidth="0.66"
        />
        <path
          d="M310.109 516.312C283.682 529.671 254.367 536.447 222.977 536.447C188.47 536.447 156.909 529.261 129.169 515.088C103.944 502.2 81.9559 483.624 63.8159 459.876C30.9959 416.91 13.494 358.109 13.494 298.549C13.494 233.665 27.2999 175.28 57.1319 117.204C66.6759 98.6246 76.5639 83.2196 87.364 70.1076C98.3159 56.8116 109.918 46.2206 122.834 37.7286C148.89 20.5977 180.676 12.2706 220.009 12.2706C258.678 12.2706 288.714 19.8776 314.534 36.2096C327.593 44.4706 339.498 54.9106 350.927 68.1296C362.375 81.3696 373.104 97.1126 383.728 116.259C398.026 142.028 408.977 170.998 416.277 202.365C423.96 235.387 426.537 268.2 426.537 307.703C426.537 364.479 408.303 421.348 374.21 463.728C356.057 486.294 334.49 503.986 310.109 516.312ZM439.736 311.663C439.736 228.76 423.238 162.979 394.117 110.496C350.801 32.4336 300.183 0.390625 220.009 0.390625C135.991 0.390625 85.3049 36.3577 46.5639 111.776C20.4809 162.553 0.293945 226.291 0.293945 302.508C0.293945 411.716 61.9039 535.868 195.622 550.792C205.401 551.884 212.822 560.102 212.822 569.942V870.121H227.862V570.34C227.862 560.443 235.366 552.169 245.214 551.177C370.209 538.585 439.736 420.462 439.736 311.663Z"
          fill="white"
        />
        {dots.map(({id, cx, cy, variant}) => (
          <Dot
            key={id}
            id={id}
            onClick={handleDotClick}
            variant={variant}
            cx={cx}
            cy={cy}
          />
        ))}
      </chakra.svg>
      <DialogRoot
        placement={{base: 'top', md: 'center'}}
        motionPreset="slide-in-top"
        open={open}
        onOpenChange={e => setOpen(e.open)}
      >
        <DialogContent mx={4}>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default Racket;

import React, {useRef, useState} from 'react';
import {Heading, StackProps, VStack} from '@chakra-ui/react';
import {ReactTyped, Typed} from 'react-typed';
import {JetBrainsMono} from '@/styles/fonts';
import {MIN_PADDING} from '@/constants';

type LandingTextAnimatorProps = StackProps;

const LandingTextAnimator = ({...props}: LandingTextAnimatorProps) => {
  const firstLineTypedRef = useRef<Typed | null>(null);
  const secondLineTypedRef = useRef<Typed | null>(null);
  const thirdLineTypedRef = useRef<Typed | null>(null);
  const [showLoopCursor, setShowLoopCursor] = useState(false);
  return (
    <>
      <VStack
        alignItems="initial"
        {...props}
        gap={{base: 2, md: 4}}
        pointerEvents="none"
        p={1}
      >
        <VStack alignItems="initial" gap={0}>
          <Heading as="h4" size="sm" style={JetBrainsMono.style}>
            <ReactTyped
              typedRef={e => {
                firstLineTypedRef.current = e;
              }}
              strings={['Hi, my name is']}
              typeSpeed={50}
              showCursor={false}
              onComplete={() => {
                firstLineTypedRef.current?.stop();
                setTimeout(() => {
                  secondLineTypedRef.current?.start();
                }, 500);
              }}
            />
          </Heading>
          <Heading
            as="h1"
            size={{base: 'lg', md: '3xl'}}
            style={JetBrainsMono.style}
          >
            <ReactTyped
              typedRef={e => {
                secondLineTypedRef.current = e;
              }}
              strings={[`Matthieu Nogueron`]}
              showCursor={false}
              typeSpeed={50}
              stopped={true}
              onComplete={() => {
                secondLineTypedRef.current?.stop();
                setShowLoopCursor(true);
                setTimeout(() => {
                  thirdLineTypedRef.current?.start();
                }, 700);
              }}
            />
          </Heading>
        </VStack>
        <Heading
          as="h2"
          size={{base: 'md', md: '2xl'}}
          style={JetBrainsMono.style}
        >
          <ReactTyped
            typedRef={e => {
              thirdLineTypedRef.current = e;
            }}
            strings={[
              `I'm a Frontend Technical Lead`,
              `I'm a  React mentor`,
              `I'm a Badminton player`,
              `I'm a Design System lover`,
              `I'm an Audit maker`,
            ]}
            typeSpeed={50}
            backSpeed={30}
            backDelay={2000}
            stopped={true}
            loop={true}
            showCursor={showLoopCursor}
            /*onStringTyped={arrayPos => {
                if (firstLoop.current && arrayPos === 0) {
                  thirdLineTypedRef.current?.stop();
                  firstLoop.current = false;
                  setTimeout(() => {
                    fourthLineTypedRef.current?.start();
                  }, 700);
                }
              }}*/
          />
        </Heading>
      </VStack>
      {/*<VStack
        justifyContent="flex-end"
        alignItems="flex-end"
        {...props}
        gap={1}
        position="absolute"
        bottom={{base: 12, md: 12}}
        right={{base: 6, md: 12}}
        pointerEvents="none"
      >
        <Heading as="h3" size={{base: 'md', md: 'xl'}} textAlign="right">
          <ReactTyped
            typedRef={e => {
              fourthLineTypedRef.current = e;
            }}
            strings={[`...let's embark on a badminton journey together`]}
            typeSpeed={50}
            showCursor={false}
            stopped={true}
            onComplete={() => {
              setTimeout(() => {
                thirdLineTypedRef.current?.start();
              }, 700);
            }}
          />
        </Heading>
      </VStack>*/}
    </>
  );
};

LandingTextAnimator.appTitle = '';

LandingTextAnimator.disableMove = true;
// TODO enable disabling screen resize
LandingTextAnimator.disableResize = true;

// TODO handle strict window size
LandingTextAnimator.preferredRatio = 0.8;
LandingTextAnimator.preferredRatioMobile = 0.7;
LandingTextAnimator.maxApplicationHeight = 900;
LandingTextAnimator.minMobileRatio = 0.55;

// TODO handle resizing

LandingTextAnimator.getStaticBox = (container: {
  width: number;
  height: number;
}) => {
  if (container.width < 800) {
    return {
      top: MIN_PADDING,
      left: MIN_PADDING,
      width: container.width - 2 * MIN_PADDING,
      height: 114,
    };
  }
  return {
    top: 16 * 4,
    left: 16 * 4,
    width: 500,
    height: 158,
  };
};

export default LandingTextAnimator;

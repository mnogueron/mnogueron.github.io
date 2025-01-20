import React, {useState} from 'react';
import {IconButton, IconButtonProps, Text, Link} from '@chakra-ui/react';
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog';
import {LuConstruction} from 'react-icons/lu';
import {LAST_UPDATE} from '@/constants/lastUpdate';

type WipMenuProps = IconButtonProps;

const WipMenu = ({...props}: WipMenuProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <IconButton
        aria-label="state of this website"
        rounded="full"
        variant="ghost"
        {...props}
        onClick={() => setOpen(true)}
      >
        <LuConstruction />
      </IconButton>
      <DialogRoot
        placement={{base: 'top', md: 'center'}}
        motionPreset="slide-in-top"
        open={open}
        onOpenChange={e => setOpen(e.open)}
      >
        <DialogContent mx={4}>
          <DialogHeader>
            <DialogTitle>{'WIP'}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Text as="p" whiteSpace="pre-wrap">
              {`This website is currently in a WIP state.

I recently decided to totally rewrite my previous portfolio and do something that matches a little bit more who I am. What you will find in there is a badminton themed technical website that contains my experiences, my projects and a little bit more about me.

Follow along as I had more and more UI and technical details to this portfolio!

Last update: ${new Date(LAST_UPDATE).toDateString()}`}
            </Text>
            <Link
              variant="underline"
              href="https://github.com/mnogueron/mnogueron.github.io"
              colorPalette="teal"
            >
              Github repo
            </Link>
          </DialogBody>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default WipMenu;

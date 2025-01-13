import React, {useMemo} from 'react';
import {IconButton, Text, useDisclosure, VStack} from '@chakra-ui/react';
import useMeasure from 'react-use-measure';
import {FaChevronDown, FaChevronUp} from 'react-icons/fa6';

type ExperienceCardProps = {
  dateLabel: string;
  title: string;
  content: string;
};

const ExperienceCard = ({dateLabel, title, content}: ExperienceCardProps) => {
  const {open, onToggle} = useDisclosure();
  const [truncatedTextRef, {height: textHeight}] = useMeasure();
  const [fullTextRef, {height: actualTextHeight}] = useMeasure();
  const isTruncated = useMemo(() => {
    return textHeight !== actualTextHeight;
  }, [actualTextHeight, textHeight]);
  return (
    <VStack
      py={4}
      ps={4}
      pe={8}
      width="xl"
      maxWidth="90%"
      borderRadius={8}
      backgroundColor="#29282BE6" // 90% opacity
      borderColor="#333333"
      borderWidth={1}
      alignItems="initial"
      gap={1}
      position="relative"
    >
      <Text fontWeight="semibold" fontSize="sm">
        {dateLabel}
      </Text>
      <VStack alignItems="initial" gap={4} position="relative">
        <Text fontWeight="semibold">{title}</Text>
        <Text
          fontSize="sm"
          whiteSpace="pre-wrap"
          lineClamp={open ? undefined : 4}
        >
          {content}
        </Text>
        <Text
          ref={truncatedTextRef}
          fontSize="sm"
          whiteSpace="pre-wrap"
          lineClamp={4}
          position="absolute"
          opacity={0}
          zIndex={-1}
        >
          {content}
        </Text>
        <Text
          ref={fullTextRef}
          fontSize="sm"
          whiteSpace="pre-wrap"
          position="absolute"
          opacity={0}
          zIndex={-1}
        >
          {content}
        </Text>
      </VStack>
      {isTruncated && (
        <IconButton
          rounded="full"
          variant="ghost"
          position="absolute"
          right={1}
          bottom={1}
          onClick={onToggle}
        >
          {open ? <FaChevronUp /> : <FaChevronDown />}
        </IconButton>
      )}
    </VStack>
  );
};

export default ExperienceCard;

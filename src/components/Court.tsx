import React from 'react';
import {chakra, HTMLChakraProps} from '@chakra-ui/react';
import {ProjectType} from '@/containers/types';

type CourtProps = {
  onCourtClick: (projectId: ProjectType) => void;
} & Partial<HTMLChakraProps<'svg'>>;

const Court = ({onCourtClick, ...props}: CourtProps) => {
  const handleProject = () => {
    // TODO handle project
  };

  return (
    <chakra.svg height="1220" viewBox="0 0 2680 1220" fill="outline" {...props}>
      <chakra.path
        d="M952 96H1340V1124H952V96Z"
        fill="screen.landing"
        cursor="pointer"
      />
      <chakra.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M940 96V604H156V96H940Z"
        fill="screen.aboutMe"
        _hover={{
          fill: 'screen.aboutMe.hover',
        }}
        cursor="pointer"
        onClick={handleProject}
      />
      <chakra.path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M144 1208V1136H12V1208H144Z"
        fill="screen.experiences"
        _hover={{
          fill: '#F0A46E',
        }}
        cursor="pointer"
      />
      <path
        d="M1340 0V1220"
        stroke="white"
        strokeWidth="12"
        strokeDasharray="24 24"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1340 1208V1220H2680V0H1340V12H1728V84H1340V96H1728V1124H1340V1136H1728V1208H1340ZM1740 1208V1136H2524V1208H1740ZM1740 1124V616H2524V1124H1740ZM1740 604V96H2524V604H1740ZM1740 84V12H2524V84H1740ZM2536 96V604H2668V96H2536ZM2668 1124V616H2536V1124H2668ZM2536 1208V1136H2668V1208H2536ZM2536 84V12H2668V84H2536Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1340 1208V1220H0V0H1340V12H952V84H1340V96H952V1124H1340V1136H952V1208H1340ZM940 1208V1136H156V1208H940ZM940 1124V616H156V1124H940ZM940 604V96H156V604H940ZM940 84V12H156V84H940ZM144 96V604H12V96H144ZM12 1124V616H144V1124H12ZM144 1208V1136H12V1208H144ZM144 84V12H12V84H144Z"
        fill="white"
      />
    </chakra.svg>
  );
};

export default Court;

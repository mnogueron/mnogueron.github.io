import {Positions} from '@/os/store/types';
import React from 'react';

export enum ApplicationId {
  ABOUT_ME = 'about_me',
  EXPERIENCES = 'experiences',
  PROJECTS = 'projects',
  LANDING_TEXT_ANIMATOR = 'landing_text_animator',
  ABOUT_APP = 'about_app',
}

export type AppComponent = React.ComponentType & {
  config: AppConfig;
};

export type AppConfig = {
  appTitle: string;
  preferredRatio: number;
  preferredRatioMobile: number;
  maxApplicationHeight: number;
  minMobileRatio: number;
  minWidth?: number;
  minHeight?: number;
  disableResize?: boolean;
  disableMove?: boolean;
  getStaticBox?: (container: {width: number; height: number}) => Positions;
};

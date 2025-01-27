import {createSystem, defineConfig, defaultConfig} from '@chakra-ui/react';

const customConfig = defineConfig({
  globalCss: {
    html: {
      background: 'screen.landing',
      scrollBehavior: 'smooth',
    },
    /*"html:has(body[data-screen='about_me'])": {
      background: 'screen.aboutMe',
    },
    "html:has(body[data-screen='experiences'])": {
      background: 'screen.experiences',
    },
    "html:has(body[data-screen='projects'])": {
      background: 'screen.projects',
    },*/
  },
  theme: {
    tokens: {
      colors: {},
    },
    semanticTokens: {
      colors: {
        outline: {
          value: {base: 'black', _dark: 'white'},
        },
        screen: {
          landing: {
            DEFAULT: {value: '#29282B'},
            hover: {value: '#29282B'},
          },
          aboutMe: {
            DEFAULT: {value: '#334858'},
            hover: {value: '#5C829E'},
          },
          experiences: {
            DEFAULT: {value: '#E97D30'},
            hover: {value: '#F0A46E'},
          },
          projects: {
            DEFAULT: {value: '#0C9B8A'},
            hover: {value: '#20EED5'},
          },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);

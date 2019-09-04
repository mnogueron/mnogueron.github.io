import ReactEasyPanZoomModalDescription from './ReactEasyPanZoomModalDescription'
import ReactEasyPanzoomModalContent from './ReactEasyPanzoomModalContent'

import SimpleTagImage from '../../assets/simpletag.png'
import NpmImage from '../../assets/npm.png'
import PortfolioImage from '../../assets/portfolio.png'

/**
 * This object contains all the different projects displayed on the portfolio
 * to add one, just add a new attribute with the correct content
 */
export default [
  {
    key: 'simpleTag',
    title: 'section.projects.simpleTag.title',
    subtitle: 'section.projects.simpleTag.subtitle',
    description: {
      text: 'section.projects.simpleTag.description',
      link: {
        url: 'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag',
        gaAction: 'Open SimpleTag play store',
        text: 'SimpleTag - Google Play',
      },
    },
    backgroundImage: SimpleTagImage,
    buttons: [
      {
        key: 'simpletag-store-link',
        url: 'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag',
        gaAction: 'Open SimpleTag play store',
        icon: 'google-play',
      },
    ],
  },
  {
    key: 'react-easy-panzoom',
    title: 'section.projects.react-easy-panzoom.title',
    subtitle: 'section.projects.react-easy-panzoom.subtitle',
    description: {
      isComponent: true,
      Component: ReactEasyPanZoomModalDescription,
    },
    ModalLeftSectionComponent: ReactEasyPanzoomModalContent,
    backgroundImage: NpmImage,
    buttons: [
      {
        key: 'react-easy-panzoom-github-link',
        url: 'https://github.com/mnogueron/react-easy-panzoom',
        gaAction: 'Open GitHub react-easy-panzoom',
        icon: 'github',
      },
      {
        key: 'react-easy-panzoom-npm-link',
        url: 'https://www.npmjs.com/package/react-easy-panzoom',
        gaAction: 'Open NPM react-easy-panzoom',
        icon: 'npm',
      },
      {
        key: 'react-easy-panzoom-storybook-link',
        url: '/react-easy-panzoom',
        gaAction: 'Open Storybook react-easy-panzoom',
        icon: 'storybook',
      },
    ],
  },
  {
    key: 'portfolio',
    title: 'section.projects.portfolio.title',
    subtitle: 'section.projects.portfolio.subtitle',
    description: {
      text: 'section.projects.portfolio.description',
      link: {
        url: 'https://github.com/mnogueron/mnogueron.github.io',
        gaAction: 'Open GitHub mnogueron.github.io',
        text: 'github.com/mnogueron/mnogueron.github.io',
      },
    },
    backgroundImage: PortfolioImage,
    buttons: [
      {
        key: 'portfolio-github-link',
        url: 'https://github.com/mnogueron/mnogueron.github.io',
        gaAction: 'Open GitHub mnogueron.github.io',
        icon: 'github',
      },
    ],
  },
]

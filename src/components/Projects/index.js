import React from 'react'
import { FormattedMessage } from 'react-intl'
import ProjectCard from './ProjectCard'
import NewTabLink from './NewTabLink'
import NewTabIconButton from './NewTabIconButton'
import ReactEasyPanzoomModalContent from './ReactEasyPanzoomModalContent'

import SimpleTagImage from '../../assets/simpletag.png'
import NpmImage from '../../assets/npm.png'
import PortfolioImage from '../../assets/portfolio.png'

import GitHubIcon from 'mdi-material-ui/GithubCircle'
import NpmIcon from 'mdi-material-ui/NpmVariantOutline'
import GooglePlayIcon from 'mdi-material-ui/GooglePlay'
import StorybookIcon from 'mdi-material-ui/TestTube'

const SimpleTagStoreURL = 'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag'
const EasyPanzoomGithubURL = 'https://github.com/mnogueron/react-easy-panzoom'
const PortfolioGithubURL = 'https://github.com/mnogueron/mnogueron.github.io'

// This object contains all the different projects displayed on the portfolio
// to add one, just add a new attribute with the correct content
const projects = {
  simpleTag: {
    title: <FormattedMessage id={'section.projects.simpleTag.title'} />,
    subtitle: <FormattedMessage id={'section.projects.simpleTag.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.simpleTag.description'}
        values={{
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <NewTabLink
                href={SimpleTagStoreURL}
                gaAction={'Open SimpleTag play store'}
                text={'SimpleTag - Google Play'}
              />
            </div>
          ),
        }}
      />
    ),
    backgroundImage: SimpleTagImage,
    actionButtons: [
      (
        <NewTabIconButton
          key={'simpletag-store-link'}
          href={SimpleTagStoreURL}
          gaAction={'Open SimpleTag play store'}
        >
          <GooglePlayIcon />
        </NewTabIconButton>
      ),
    ],
  },
  'react-easy-panzoom': {
    title: <FormattedMessage id={'section.projects.react-easy-panzoom.title'} />,
    subtitle: <FormattedMessage id={'section.projects.react-easy-panzoom.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.react-easy-panzoom.description'}
        values={{
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <NewTabLink
                href={EasyPanzoomGithubURL}
                gaAction={'Open GitHub react-easy-panzoom'}
                text={'github.com/mnogueron/react-easy-panzoom'}
              />
            </div>
          ),
          b: msg => <b>{msg}</b>,
        }}
      />
    ),
    modalLeftSection: <ReactEasyPanzoomModalContent />,
    backgroundImage: NpmImage,
    actionButtons: [
      (
        <NewTabIconButton
          key={'react-easy-panzoom-github-link'}
          href={EasyPanzoomGithubURL}
          gaAction={'Open GitHub react-easy-panzoom'}
        >
          <GitHubIcon />
        </NewTabIconButton>
      ),
      (
        <NewTabIconButton
          key={'react-easy-panzoom-npm-link'}
          href={'https://www.npmjs.com/package/react-easy-panzoom'}
          gaAction={'Open NPM react-easy-panzoom'}
        >
          <NpmIcon />
        </NewTabIconButton>
      ),
      (
        <NewTabIconButton
          key={'react-easy-panzoom-storybook-link'}
          href={'/react-easy-panzoom'}
          gaAction={'Open Storybook react-easy-panzoom'}
        >
          <StorybookIcon />
        </NewTabIconButton>
      ),
    ],
  },
  portfolio: {
    title: <FormattedMessage id={'section.projects.portfolio.title'} />,
    subtitle: <FormattedMessage id={'section.projects.portfolio.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.portfolio.description'}
        values={{
          b: msg => <b>{msg}</b>,
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <NewTabLink
                href={PortfolioGithubURL}
                gaAction={'Open GitHub mnogueron.github.io'}
                text={'github.com/mnogueron/mnogueron.github.io'}
              />
            </div>
          ),
        }}
      />
    ),
    backgroundImage: PortfolioImage,
    actionButtons: [
      (
        <NewTabIconButton
          key={'portfolio-github-link'}
          href={PortfolioGithubURL}
          gaAction={'Open GitHub mnogueron.github.io'}
        >
          <GitHubIcon />
        </NewTabIconButton>
      ),
    ],
  },
}

export const ProjectCards = Object.keys(projects).map(key => ({
  key,
  ProjectComponent: (props) => (
    <ProjectCard {...projects[key]} {...props}/>
  ),
}))

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProjectCard from '../ProjectCard'
import PanZoom from 'react-easy-panzoom'
import SimpleTagImage from '../../assets/simpletag.png'
import NpmImage from '../../assets/npm.png'
import PortfolioImage from '../../assets/portfolio.png'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Section from './Section'
import * as ReactGA from 'react-ga'
import IconButton from '@material-ui/core/IconButton'
import { openNewTab } from '../../utils'

import GitHubIcon from 'mdi-material-ui/GithubCircle'
import NpmIcon from 'mdi-material-ui/NpmVariantOutline'
import GooglePlayIcon from 'mdi-material-ui/GooglePlay'
import StorybookIcon from 'mdi-material-ui/TestTube'

const useStyles = makeStyles(theme => ({
  gridRoot: {
    flexGrow: 1,
    paddingTop: 76,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 84,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 94,
    },
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: grey['200'],
  },
  titleContainer : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: theme.spacing(8),
  },
  title: {
    fontWeight: 300,
    fontSize: '1.9rem',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  divider: {
    height: 6,
    width: 70,
    backgroundColor: grey['900'],
    marginTop: theme.spacing(2),
  },
  text: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
    fontSize: '1.4rem',
  },
  panZoomContainer: {
    height: '30vh',
    border: `1px solid grey`,
    borderRadius: 4,
    overflow: 'hidden',
  },
}))

const PortfolioSourceLink = () => {
  function onClick() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Navigation',
        action: 'Open GitHub mnogueron.github.io',
      })
    }
  }

  return (
    <a
      href={'https://github.com/mnogueron/mnogueron.github.io'}
      target={'_blank'}
      rel={'noopener noreferrer'}
      onClick={onClick}
    >
      {'github.comm/mnogueron/mnogueron.github.io'}
    </a>
  )
}

const ReactEasyPanZoomLink = () => {
  function onClick() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Navigation',
        action: 'Open GitHub react-easy-panzoom',
      })
    }
  }

  return (
    <a
      href={'https://github.com/mnogueron/react-easy-panzoom'}
      target={'_blank'}
      rel={'noopener noreferrer'}
      onClick={onClick}
    >
      {'github.comm/mnogueron/react-easy-panzoom'}
    </a>
  )
}

const SimpleTagLink = () => {
  function onClick() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Navigation',
        action: 'Open SimpleTag play store',
      })
    }
  }

  return (
    <a
      href={'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag'}
      target={'_blank'}
      rel={'noopener noreferrer'}
      onClick={onClick}
    >
      {'SimpleTag'}
    </a>
  )
}

const Projects = (props) => {
  const classes = useStyles(props)

  function openLink(link) {
    return () => {
      if (link) {
        openNewTab(link)
      }
    }
  }

  return (
    <Section backgroundColor={blueGrey['50']}>

      <div className={classes.titleContainer}>
        <Typography variant={'h4'} className={classes.title}>
          {'My personal projects'}
        </Typography>
        <div className={classes.divider} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
          <ProjectCard
            title={'SimpleTag'}
            subtitle={'Get Grenoble\'s public transport live schedule on your Android'}
            backgroundImage={SimpleTagImage}
            actionButtons={[
              (
                <IconButton key={'simpletag-store-link'} onClick={openLink('https://play.google.com/store/apps/details?id=com.mnogueron.simpletag')}>
                  <GooglePlayIcon />
                </IconButton>
              ),
            ]}
            description={(
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {'SimpleTag is an application to get live schedule for public transportation in Grenoble.'}
                {'\nMore information is available on the Google Play Store page:'}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <SimpleTagLink />
                </div>
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <ProjectCard
            title={'react-easy-panzoom'}
            subtitle={'React library for pan/zoom support for any kind of component'}
            backgroundImage={NpmImage}
            actionButtons={[
              (
                <IconButton key={'react-easy-panzoom-github-link'} onClick={openLink('https://github.com/mnogueron/react-easy-panzoom')}>
                  <GitHubIcon />
                </IconButton>
              ),
              (
                <IconButton key={'react-easy-panzoom-npm-link'} onClick={openLink('https://www.npmjs.com/package/react-easy-panzoom')}>
                  <NpmIcon />
                </IconButton>
              ),
              (
                <IconButton key={'react-easy-panzoom-storybook-link'} onClick={openLink('/react-easy-panzoom')}>
                  <StorybookIcon />
                </IconButton>
              ),
            ]}
            description={(
              <div>
                <div style={{ marginBottom: 24 }}>
                  <b>{'react-easy-panzoom'}</b>
                  {' is a React library to enable pan and zoom feature on any react component. This project is open source and can be found at this url: '}
                  <ReactEasyPanZoomLink />
                </div>
                <PanZoom
                  className={classes.panZoomContainer}
                  maxZoom={2}
                  minZoom={0.3}
                  autoCenter
                  enableBoundingBox
                  realPinch
                >
                  <div>You can pan and zoom this text</div>
                </PanZoom>
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <ProjectCard
            title={'Portfolio'}
            subtitle={'Personal portfolio designed and implemented from scratch using React and Material-UI'}
            backgroundImage={PortfolioImage}
            actionButtons={[
              (
                <IconButton key={'portfolio-github-link'} onClick={openLink('https://github.com/mnogueron/mnogueron.github.io')}>
                  <GitHubIcon />
                </IconButton>
              ),
            ]}
            description={(
              <div>
                <b>{'Personal portfolio'}</b>
                {' is a React library to enable pan and zoom feature on any react component. This project is open source and can be found at this url: '}
                <PortfolioSourceLink />
              </div>
            )}
          />
        </Grid>
      </Grid>
    </Section>
  )
}

export default Projects

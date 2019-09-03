import React, { useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
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
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import { GA } from '../../utils'

import GitHubIcon from 'mdi-material-ui/GithubCircle'
import NpmIcon from 'mdi-material-ui/NpmVariantOutline'
import GooglePlayIcon from 'mdi-material-ui/GooglePlay'
import StorybookIcon from 'mdi-material-ui/TestTube'
import { useDispatch } from 'react-redux'
import { fetchGithubReactEasyPanzoomData } from '../../actions/appThunk'

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

const useModalStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    height: '100%',
    boxSizing: 'border-box',
  },
  panZoomContainer: {
    height: '100%',
    border: `1px solid grey`,
    overflow: 'hidden',
  },
}))

const SimpleTagStoreURL = 'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag'
const EasyPanzoomGithubURL = 'https://github.com/mnogueron/react-easy-panzoom'
const PortfolioGithubURL = 'https://github.com/mnogueron/mnogueron.github.io'

const ReactEasyPanZoomLink = () => (
  <Link
    href={EasyPanzoomGithubURL}
    target={'_blank'}
    rel={'noopener noreferrer'}
    onClick={sendGaNavigation('Open GitHub react-easy-panzoom')}
  >
    {'github.com/mnogueron/react-easy-panzoom'}
  </Link>
)

const SimpleTagLink = () => (
  <Link
    href={SimpleTagStoreURL}
    target={'_blank'}
    rel={'noopener noreferrer'}
    onClick={sendGaNavigation('Open SimpleTag play store')}
  >
    {'SimpleTag - Google Play'}
  </Link>
)

const PortfolioLink = () => (
  <Link
    href={PortfolioGithubURL}
    target={'_blank'}
    rel={'noopener noreferrer'}
    onClick={sendGaNavigation('Open GitHub mnogueron.github.io')}
  >
    {'github.com/mnogueron/mnogueron.github.io'}
  </Link>
)

const ReactEasyPanzoomModalContent = (props) => {
  const classes = useModalStyles(props)
  return (
    <div className={classes.container}>
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
  )
}

const sendGaNavigation = (action) => () => GA.navigateTo(action)

const projectList = [
  {
    key: 'simpleTag',
    title: <FormattedMessage id={'section.projects.simpleTag.title'} />,
    subtitle: <FormattedMessage id={'section.projects.simpleTag.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.simpleTag.description'}
        values={{
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <SimpleTagLink />
            </div>
          ),
        }}
      />
    ),
    backgroundImage: SimpleTagImage,
    actionButtons: [
      (
        <IconButton
          key={'simpletag-store-link'}
          component={Link}
          href={SimpleTagStoreURL}
          target={'_blank'}
          rel={'noopener noreferrer'}
          onClick={sendGaNavigation('Open SimpleTag play store')}
        >
          <GooglePlayIcon />
        </IconButton>
      ),
    ],
  },
  {
    key: 'react-easy-panzoom',
    title: <FormattedMessage id={'section.projects.react-easy-panzoom.title'} />,
    subtitle: <FormattedMessage id={'section.projects.react-easy-panzoom.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.react-easy-panzoom.description'}
        values={{
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <ReactEasyPanZoomLink />
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
        <IconButton
          key={'react-easy-panzoom-github-link'}
          component={Link}
          href={EasyPanzoomGithubURL}
          target={'_blank'}
          rel={'noopener noreferrer'}
          onClick={sendGaNavigation('Open GitHub react-easy-panzoom')}
        >
          <GitHubIcon />
        </IconButton>
      ),
      (
        <IconButton
          key={'react-easy-panzoom-npm-link'}
          component={Link}
          href={'https://www.npmjs.com/package/react-easy-panzoom'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          onClick={sendGaNavigation('Open NPM react-easy-panzoom')}
        >
          <NpmIcon />
        </IconButton>
      ),
      (
        <IconButton
          key={'react-easy-panzoom-storybook-link'}
          component={Link}
          href={'/react-easy-panzoom'}
          target={'_blank'}
          rel={'noopener noreferrer'}
          onClick={sendGaNavigation('Open Storybook react-easy-panzoom')}
        >
          <StorybookIcon />
        </IconButton>
      ),
    ],
  },
  {
    key: 'portfolio',
    title: <FormattedMessage id={'section.projects.portfolio.title'} />,
    subtitle: <FormattedMessage id={'section.projects.portfolio.subtitle'} />,
    description: (
      <FormattedMessage
        id={'section.projects.portfolio.description'}
        values={{
          b: msg => <b>{msg}</b>,
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <PortfolioLink />
            </div>
          ),
        }}
      />
    ),
    backgroundImage: PortfolioImage,
    actionButtons: [
      (
        <IconButton
          key={'portfolio-github-link'}
          component={Link}
          href={PortfolioGithubURL}
          target={'_blank'}
          rel={'noopener noreferrer'}
          onClick={sendGaNavigation('Open GitHub mnogueron.github.io')}
        >
          <GitHubIcon />
        </IconButton>
      ),
    ],
  },
]

const Projects = (props) => {
  const dispatch = useDispatch()
  const classes = useStyles(props)

  useEffect(() => {
    dispatch(fetchGithubReactEasyPanzoomData())
  }, [dispatch])

  return (
    <Section backgroundColor={blueGrey['50']}>

      <div className={classes.titleContainer}>
        <Typography variant={'h4'} className={classes.title}>
          <FormattedMessage id={'section.projects.title'} />
        </Typography>
        <div className={classes.divider} />
      </div>

      <Grid container spacing={2}>
        {
          projectList.map(project => (
            <Grid key={project.key} item xs={12} sm={6} lg={4}>
              <ProjectCard {...project} />
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}

export default Projects

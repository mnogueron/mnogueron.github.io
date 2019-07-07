import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProjectCard from '../ProjectCard'
import PanZoom from 'react-easy-panzoom'
import SimpleTagImage from '../../assets/simpletag.png'
import NpmImage from '../../assets/npm.png'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Section from './Section'

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

const Projects = (props) => {
  const classes = useStyles(props)
  return (
    <Section backgroundColor={blueGrey['50']}>

      <div className={classes.titleContainer}>
        <Typography variant={'h4'} className={classes.title}>
          {'My projects'}
        </Typography>
        <div className={classes.divider} />
      </div>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProjectCard
            title={'SimpleTag'}
            subtitle={'Get Grenoble\'s public transport live schedule on your Android'}
            backgroundImage={SimpleTagImage}
            description={(
              <div style={{ whiteSpace: 'pre-wrap' }}>
                {'SimpleTag is an application to get live schedule for public transportation in Grenoble.'}
                {'\nMore information is available on the Google Play Store page:'}
                <div style={{ marginTop: 16, textAlign: 'center' }}>
                  <a
                    href={'https://play.google.com/store/apps/details?id=com.mnogueron.simpletag'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                  >
                    {'SimpleTag'}
                  </a>
                </div>
              </div>
            )}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <ProjectCard
            title={'react-easy-panzoom'}
            subtitle={'React library for pan/zoom support for any kind of component'}
            backgroundImage={NpmImage}
            description={(
              <div>
                <div style={{ marginBottom: 24 }}>
                  <b>{'react-easy-panzoom'}</b>
                  {' is a React library to enable pan and zoom feature on any react component. This project is open source and can be found at this url: '}
                  <a
                    href={'https://github.com/mnogueron/react-easy-panzoom'}
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                  >
                    {'github.comm/mnogueron/react-easy-panzoom'}
                  </a>
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
      </Grid>
    </Section>
  )
}

export default Projects

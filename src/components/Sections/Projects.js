import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProjectCard from '../ProjectCard'
import PanZoom from 'react-easy-panzoom'
import SimpleTagImage from '../../assets/simpletag.png'
import NpmImage from '../../assets/npm.png'

const useStyles = makeStyles(theme => ({
  title: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(4),
    textTransform: 'uppercase',
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
    <div>
      <Typography variant={'h4'} className={classes.title}>
        {'My projects'}
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <ProjectCard
            title={'SimpleTag'}
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

        <Grid item xs={12} sm={6}>
          <ProjectCard
            title={'react-easy-panzoom'}
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

      {/* TODO add projects */}
    </div>
  )
}

export default Projects

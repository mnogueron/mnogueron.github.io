import React from 'react'
import { FormattedMessage } from 'react-intl'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import grey from '@material-ui/core/colors/grey'
import blueGrey from '@material-ui/core/colors/blueGrey'
import Section from './Section'

import { ProjectCards } from '../Project'

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
          <FormattedMessage id={'section.projects.title'} />
        </Typography>
        <div className={classes.divider} />
      </div>

      <Grid container spacing={2}>
        {
          ProjectCards.map(({ key, ProjectComponent }) => (
            <Grid key={key} item xs={12} sm={6} lg={4}>
              <ProjectComponent />
            </Grid>
          ))
        }
      </Grid>
    </Section>
  )
}

export default Projects

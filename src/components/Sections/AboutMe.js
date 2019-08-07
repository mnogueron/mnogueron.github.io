import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TheMistImage from '../../assets/the-mist.jpg'
import Section from './Section'
import grey from '@material-ui/core/colors/grey'

const useStyles = makeStyles(theme => ({
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '1.2rem',
    color: grey['700'],
  },
  divider: {
    height: 6,
    width: 70,
    transform: 'translate(-50%)',
    marginTop: '1.5rem',
    marginBottom: '1.8rem',
    backgroundColor: grey['900'],

    [theme.breakpoints.down('sm')]: {
      transform: 'translate(-30%)',
    },
  },
  subtitle: {
    fontWeight: 300,
    fontSize: '1.9rem',
    textTransform: 'uppercase',
    marginBottom: theme.spacing(2),
  },
  text: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
    fontSize: '1.2rem',
    color: grey[700],
  },
  highlightText: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
    color: grey[700],

    fontSize: '1.3rem',
    textAlign: 'center',
    marginTop: theme.spacing(2),
  },
  image: {
    height: 500,
    width: '85%',
    backgroundImage: `url('${TheMistImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: '80% center',
    boxShadow: theme.shadows[3],
    marginTop: 60,
    marginBottom: 4,

    [theme.breakpoints.down('sm')]: {
      marginTop: 0,
      width: '100%',
      height: 400,
    },
  },
  caption: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}))

const AboutMe = (props) => {
  const classes = useStyles(props)
  return (
    <Section>
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Typography variant={'h4'} className={classes.title}>
            {'Who am I'}
          </Typography>

          <div className={classes.divider} />

          <Typography variant={'h5'} className={classes.subtitle}>
            {'French software engineer, hiker and sustainability advocate'}
          </Typography>

          <Typography variant={'body1'} className={classes.text}>
            {'Originally from Grenoble, near the '}
            <b>{'French Alps'}</b>
            {', the mountains are part of my DNA and so does sustainability matters.'}
            {'\n\nAs a software engineer, I pursue the goal of using my expertise to make the world a better place for all living beings.'}
            {'\n\nProviding better integration methods for refugees when coming to a new country, helping disabled people to use public transportation or simplifying access to bus and tramway schedules, all reveal the same trait: '}
          </Typography>
          <Typography className={classes.highlightText}>
            <b>{'I am driven by impactful roles.'}</b>
          </Typography>
        </Grid>

        <Grid item xs={12} md={5} className={classes.rightPanel}>
          <div className={classes.image} />
          {/*<img src={ImageGrenoble} alt={'city of Grenoble'} className={classes.image} />*/}
          <Typography variant={'caption'} className={classes.caption}>
            <i>In the mist - Vanoise, France</i>
          </Typography>
        </Grid>
      </Grid>
    </Section>
  )
}

export default AboutMe

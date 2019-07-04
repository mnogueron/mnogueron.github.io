import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ImageGrenoble from '../../assets/grenoble.jpg'

const useStyles = makeStyles(theme => ({
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: theme.spacing(5),
  },
  title: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    textTransform: 'uppercase',
  },
  text: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
    fontSize: '1.4rem',
  },
  image: {
    width: '90%',
    borderRadius: 2,
    boxShadow: theme.shadows[3],
    marginBottom: 4,
  },
  caption: {
    marginRight: theme.spacing(1),
  },
}))

const AboutMe = (props) => {
  const classes = useStyles(props)
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={7} className={classes.textContainer}>
        <Typography variant={'h4'} className={classes.title}>
          {'About me'}
        </Typography>

        <Typography variant={'h5'} className={classes.text}>
          {'Originally from Grenoble, located near the '}
          <b>{'French Alps'}</b>
          {', the mountains are part of my DNA and so does sustainability issues.'}
          {'\n\nAs a software engineer, I pursue the goal of using my knowledge to make the world a better place for all living being.'}
          {'\n\nFrom helping people to integrate to a new country, to helping disable people to use common transportation or providing easy access to public transportation schedules,\n'}
          <b>{'I am driven by impactful roles.'}</b>
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5} className={classes.rightPanel}>
        <img src={ImageGrenoble} alt={'city of Grenoble'} className={classes.image} />
        <Typography variant={'caption'} className={classes.caption}>
          Grenoble, Gate to the Alps
        </Typography>
      </Grid>
    </Grid>
  )
}

export default AboutMe

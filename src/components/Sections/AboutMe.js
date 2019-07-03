import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import ImageGrenoble from '../../assets/grenoble.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 60,
  },
  leftPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  title: {
    color: theme.palette.text.primary,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: '90%',
    borderRadius: 2,
    boxShadow: theme.shadows[3],
    marginBottom: theme.spacing(4),
  },
}))

const AboutMe = (props) => {
  const classes = useStyles(props)
  return (
    <Paper className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5} className={classes.leftPanel}>
          <img src={ImageGrenoble} alt={'city of Grenoble'} className={classes.image} />
        </Grid>

        <Grid item xs={12} sm={7} className={classes.textContainer}>
          <Typography variant={'h4'} className={classes.title}>
            About me
          </Typography>

          <Typography variant={'body1'} className={classes.text}>
            Originally from Grenoble, nicknamed the <b>Gate to the Alps</b>, the mountains are part of my DNA and so does sustainability issues.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default AboutMe

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { GithubButton, EmailButton, FacebookButton, LinkedInButton } from '../ContactButton'

const useStyles = makeStyles(theme => ({
  root: {},
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
    marginBottom: theme.spacing(2),
  },
}))

const Contact = (props) => {
  const classes = useStyles(props)
  return (
    <div>
      <Typography variant={'h4'} className={classes.title}>
        {'Contact'}
      </Typography>

      <Typography variant={'h5'} className={classes.text}>
        {'If you are interested in my profile, want to discuss about sustainable development, French culture or just want to offer me a coffee, you can contact me on the following platforms:'}
      </Typography>

      <Grid container justify={'center'} alignItems={'center'}>
        <GithubButton />
        <LinkedInButton />
        <EmailButton />
        <FacebookButton />
      </Grid>
    </div>
  )
}

export default Contact

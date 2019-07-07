import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { GithubButton, EmailButton, FacebookButton, LinkedInButton } from '../ContactButton'
import grey from '@material-ui/core/colors/grey'
import Section from './Section'

const useStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  rightPanel: {
    textAlign: 'right',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: theme.typography.fontWeightLight,
    fontSize: '1.2rem',
    color: grey['700'],
  },
  divider: {
    height: 6,
    width: 70,
    transform: 'translate(50%)',
    marginTop: '1.5rem',
    marginBottom: '1.8rem',
    backgroundColor: grey['900'],

    [theme.breakpoints.down('sm')]: {
      transform: 'translate(30%)',
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 60,
    marginTop: 60,

    '& > :not(:first-child)': {
      marginTop: theme.spacing(1),
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 0,
      paddingRight: 0,

      '& > :not(:first-child)': {
        marginTop: 0,
        marginRight: theme.spacing(1),
      },
    },
  },
}))

const Contact = (props) => {
  const classes = useStyles(props)
  return (
    <Section>
      <Grid container spacing={4} className={classes.root}>
        <Grid item xs={12} md={5}>
          <div className={classes.buttonContainer}>
            <GithubButton />
            <LinkedInButton />
            <EmailButton />
            <FacebookButton />
          </div>
        </Grid>

        <Grid item xs={12} md={7} className={classes.rightPanel}>
          <Typography variant={'h4'} className={classes.title}>
            {'Contact'}
          </Typography>

          <div className={classes.divider} />

          <Typography variant={'h5'} className={classes.subtitle}>
            {'Want to grab a coffee and chat?'}
          </Typography>

          <Typography variant={'h5'} className={classes.text}>
            {'If you are interested in my profile, want to discuss about sustainable development, French culture or just want to offer me a coffee, you can contact me by email or on these platforms.'}
          </Typography>
        </Grid>
      </Grid>
    </Section>
  )
}

export default Contact

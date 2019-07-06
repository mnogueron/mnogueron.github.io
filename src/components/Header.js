import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import BackgroundImage from '../assets/philippe-toupet-unsplash.jpg'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { EmailButton, GithubButton, LinkedInButton } from './ContactButton'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: theme.shadows[3],
    paddingLeft: 30,
    paddingRight: 30,
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundImage: `url('${BackgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(1px)',
    transform: 'scale(1.01)',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    background: 'radial-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2))',
    height: '100%',
    width: '100%',
    top: 0,
  },
  name: {
    fontSize: 60,
    marginBottom: theme.spacing(3),
    fontWeight: 500,
  },
  description: {
    fontWeight: 300,
    fontSize: 20,
    lineHeight: 1.5,
    maxWidth: 550,

    '& b': {
      fontSize: 24,
      fontWeight: 500,
    },
  },
  introduction: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  expandButton: {
    animation: '$bounce 0.50s ease infinite alternate',
    position: 'absolute',
    bottom: theme.spacing(2),
  },
  expandButtonIcon: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  '@keyframes bounce': {
    '0%' : { transform: 'translateY(0)' },
    '100%': { transform: 'translateY(-20px)' },
  },
  contactButtonContainer: {
    marginTop: theme.spacing(2),
  },
  contactIcon: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  contactButton: {
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
}))

const Header = (props) => {
  const { onExpandClick } = props
  const classes = useStyles(props)
  return (
    <header className={classes.root}>
      <div className={classes.backgroundContainer}>
        <div className={classes.background} />
        <div className={classes.overlay} />
      </div>

      <div className={classes.introduction}>
        <Typography variant={'h1'} className={classes.name}>
          Matthieu Nogueron
        </Typography>
        <Typography variant={'h5'} className={classes.description}>
          <b>I am a software engineer</b>
          {' from France living in Stockholm where I work as React tutor and full time sustainability advocate.'}
        </Typography>

        <Grid container justify={'center'} alignItems={'center'} className={classes.contactButtonContainer}>
          <GithubButton
            fontSize={'default'}
            buttonClassname={classes.contactButton}
            iconClassname={classes.contactIcon}
          />
          <LinkedInButton
            fontSize={'default'}
            buttonClassname={classes.contactButton}
            iconClassname={classes.contactIcon}
          />
          <EmailButton
            fontSize={'default'}
            buttonClassname={classes.contactButton}
            iconClassname={classes.contactIcon}
          />
        </Grid>
      </div>

      <IconButton
        className={classes.expandButton}
        onClick={onExpandClick}
      >
        <ExpandMoreIcon fontSize={'large'} className={classes.expandButtonIcon} />
      </IconButton>

    </header>
  )
}

export default Header

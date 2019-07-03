import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Typography from '@material-ui/core/Typography'
import BackgroundImage from '../assets/philippe-toupet-unsplash.jpg'
import IconButton from '@material-ui/core/IconButton'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    boxShadow: theme.shadows[3],
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
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    background: 'radial-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.2))',
    height: '100%',
    width: '100%',
    top: 0,
  },
  introduction: {
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.85)',
  },
  expandButton: {
    position: 'absolute',
    bottom: theme.spacing(2),
  },
  expandButtonIcon: {
    color: 'rgba(255, 255, 255, 0.85)',
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
        <Typography variant={'h1'}>
          Matthieu Nogueron
        </Typography>
        <Typography variant={'h2'}>
          Software Engineer
        </Typography>
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

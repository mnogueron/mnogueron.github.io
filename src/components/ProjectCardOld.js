import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import * as ReactGA from 'react-ga'
import * as ReactDom from 'react-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 400,
    cursor: 'pointer',

    border: '10px solid rgba(255, 255, 255, 0.85)',

    '&:hover': {

      border: '10px solid rgba(255, 255, 255, 0.5)',

      '& $contentContainer': {
        opacity: 1,
      },

      '& $content': {
        transform: 'translateY(0)',
      },

      '& $background': {
        filter: 'blur(2px)',
      },
    },

    [theme.breakpoints.down('sm')]: {
      minHeight: 400,
    },
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundImage: props => `url('${props.backgroundImage}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'filter 200ms',
  },
  contentContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    /*background: 'radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',*/
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
    zIndex: 1,
    color: 'rgba(255, 255, 255, 0.90)',

    transition: 'opacity 200ms',
    opacity: 0,
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 80,
    paddingRight: 80,

    transform: 'translateY(5%)',
    transition: 'transform 200ms',
    textAlign: 'center',
  },
  divider: {
    height: 6,
    width: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.90)',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: 36,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: theme.typography.fontWeightLight,
    //marginTop: theme.spacing(2),
  },
  description: {
    fontSize: 16,
  },
}))

const usePortalStyles = makeStyles({
  root: {
    position: 'absolute',
    top: -1000,
    left: -1000,
  },
})

const ProjectSeoDescriptionPortal = (props) => {
  const { children } = props
  const classes = usePortalStyles(props)
  return ReactDom.createPortal(<div className={classes.root}>{children}</div>, document.body)
}

const ProjectCardOld = (props) => {
  const { title, description, subtitle } = props
  const [dialogOpen, setOpenDialog] = useState(false)
  const classes = useStyles(props)

  function openDialog() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.pageview(`Project: ${title}`)
    }

    setOpenDialog(true)
  }

  function closeDialog() {
    setOpenDialog(false)
  }

  return (
    <React.Fragment>
      <div className={classes.root} onClick={openDialog}>
        <div className={classes.backgroundContainer}>
          <div className={classes.background} />
        </div>

        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <div className={classes.title}>{title}</div>
            <div className={classes.divider} />
            <Typography variant={'h6'} className={classes.subtitle}>
              {subtitle}
            </Typography>
          </div>
        </div>
      </div>

      <ProjectSeoDescriptionPortal>
        {description}
      </ProjectSeoDescriptionPortal>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {description}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default ProjectCardOld

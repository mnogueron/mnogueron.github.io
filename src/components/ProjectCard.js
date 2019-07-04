import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const useStyles = makeStyles(theme => ({
  root: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 300,
    cursor: 'pointer',
    borderRadius: 10,

    '&:hover': {
      '& $title': {
        textDecoration: 'underline',
      },
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
    filter: 'blur(4px)',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    background: 'radial-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7))',
    height: '100%',
    width: '100%',
    top: 0,
  },
  contentContainer: {
    zIndex: 1,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  title: {
    fontSize: 32,
  },
  description: {
    fontSize: 16,
  },
}))

const ProjectCard = (props) => {
  const { title, description } = props
  const [dialogOpen, setOpenDialog] = useState(false)
  const classes = useStyles(props)

  function openDialog() {
    setOpenDialog(true)
  }

  function closeDialog() {
    setOpenDialog(false)
  }

  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={4} onClick={openDialog}>
        <div className={classes.backgroundContainer}>
          <div className={classes.background} />
          <div className={classes.overlay} />
        </div>

        <div className={classes.contentContainer}>
          <div className={classes.title}>{title}</div>
        </div>
      </Paper>

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

export default ProjectCard

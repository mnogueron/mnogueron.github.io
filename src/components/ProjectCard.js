import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormattedMessage } from 'react-intl'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import * as ReactGA from 'react-ga'

import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import SEOPortal from './SEOPortal'

const useStyles = makeStyles(theme => ({

  backgroundContainer: {
    width: '100%',
    paddingTop: '80%', /* 0.8:1 Aspect Ratio */
    position: 'relative',

    [theme.breakpoints.up('lg')]: {
      paddingTop: '90%',
    },
  },

  media: {
    height: '100%',
    width: '100%',

    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  readMore: {
    marginLeft: 'auto',
  },
}))

const ProjectCard = (props) => {
  const { title, description, subtitle, backgroundImage, actionButtons = [] } = props
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
      <Card>
        <CardActionArea onClick={openDialog}>
          <div className={classes.backgroundContainer}>
            <CardMedia
              className={classes.media}
              image={backgroundImage}
              title={title}
            />
          </div>

          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {subtitle}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions disableSpacing>

          {
            actionButtons
          }

          <Button
            size="small"
            color="primary"
            className={classes.readMore}
            onClick={openDialog}
            aria-label="read more"
          >
            <FormattedMessage id={'general.readMore'} />
          </Button>
        </CardActions>
      </Card>

      <SEOPortal>
        {description}
      </SEOPortal>

      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        maxWidth={'md'}
        fullWidth
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

import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Settings from '@material-ui/icons/Settings'
import ProfilePicture from './assets/matthieu.jpeg'
import './maintenance.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    marginTop: 64,
  },
  flex: {
    flex: 1,
  },
  leftContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  rightContainer: {
    backgroundColor: '#FAFAFA',
    height: '100%',
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  avatar: {
    width: 200,
    height: 200,
  },

  avatarWrapper: {
    overflow: 'hidden',
    borderRadius: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    width: 200,
    height: 200,
  },
  aboutSection: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3,
  }),
})

class Content extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={4} className={classes.leftContainer}>
          <Grid
            container
            direction={ 'column' }
            alignItems={ 'center' }
            style={{ padding: 50 }}
          >
            <Avatar
              className={classes.avatar}
              src={ ProfilePicture }
              style={{ marginBottom: 16 }}
            />
            <Typography variant="headline">
              Matthieu Nogueron
            </Typography>
            <Typography variant="body1">
              <a href="mailto:matthieu.nogueron@gmail.com">matthieu.nogueron@gmail.com</a>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8} className={classes.rightContainer}>
          <Grid
            container
            direction={ 'column' }
            alignItems={ 'center' }
            justify={ 'center' }
            style={{ padding: 50, paddingTop: 100 }}
          >
            <Typography variant="title" style={{ marginBottom: 16 }}>
              Under construction
            </Typography>
            <Settings className="Settings-logo" style={{ fontSize: 40 }}/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(Content)

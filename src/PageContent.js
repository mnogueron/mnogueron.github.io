import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import ProfilePicture from './assets/matthieu.jpeg'
import LinkedInIcon from './assets/LinkedInIcon'
import GitHubIcon from './assets/GitHubIcon'
import FacebookIcon from './assets/FacebookIcon'
import MailIcon from '@material-ui/icons/Mail'
import Settings from '@material-ui/icons/Settings'

const styles = () => ({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 42,
    paddingRight: 42,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 200,
    height: 200,
  },
  name: {
    marginBottom: 16,
    textAlign: 'center',
  },
  position: {
    marginBottom: 16,
    textAlign: 'center',
  },
  maintenanceContainer: {
    marginTop: 50,
    marginBottom: 50,
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 42,
    paddingRight: 42,
    textAlign: 'center',
  },
})

class PageContent extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container direction={ 'column' }>
        <Paper className={ classes.maintenanceContainer }>
          <Typography variant="title" style={{ marginBottom: 16 }}>
            Under construction
          </Typography>
          <Settings className="Settings-logo" style={{ fontSize: 40 }}/>
        </Paper>
      </Grid>
    )
  }

}

export default withStyles(styles)(PageContent)

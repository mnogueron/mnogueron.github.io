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
})

class AboutMe extends Component {

  _openGitHub = () => {
    window.location = 'https://github.com/mnogueron'
  }

  _openEmail = () => {
    window.location = 'mailto:matthieu.nogueron@gmail.com'
  }

  _openLinkedIn = () => {
    window.location = 'https://www.linkedin.com/in/matthieu-nogueron/'
  }

  _openFacebook = () => {
    window.location = 'https://www.facebook.com/matthieu.nogueron'
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.container}>
        <Grid
          container
          direction={ 'column' }
          alignItems={ 'center' }
        >
          <Avatar
            className={classes.avatar}
            src={ ProfilePicture }
            style={{ marginBottom: 32 }}
          />
          <Typography variant="headline" style={{ marginBottom: 16 }}>
            Matthieu Nogueron
          </Typography>

          <Typography variant="subheading" style={{ marginBottom: 16 }}>
            Software engineer | Fullstack programmer
          </Typography>

          <Grid container justify={'center'} alignItems={'center'}>

            <IconButton onClick={ this._openGitHub }>
              <GitHubIcon/>
            </IconButton>

            <IconButton onClick={ this._openLinkedIn }>
              <LinkedInIcon/>
            </IconButton>

            <IconButton onClick={ this._openEmail }>
              <MailIcon/>
            </IconButton>

            <IconButton onClick={ this._openFacebook }>
              <FacebookIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    )
  }

}

export default withStyles(styles)(AboutMe)

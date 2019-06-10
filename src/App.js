import React, { Component } from 'react'
import { withStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from './assets/GitHubIcon'
import Content from './Content'

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
}

class App extends Component {

  _handleGithubIconPress = () => {
    window.location = 'https://github.com/mnogueron'
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="absolute">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              mnogueron.github.io
            </Typography>

            <IconButton
              onClick={this._handleGithubIconPress}
              color="inherit"
            >
              <GitHubIcon/>
            </IconButton>
          </Toolbar>

        </AppBar>

        <Content/>
      </div>
    )
  }
}

export default withStyles(styles)(App)

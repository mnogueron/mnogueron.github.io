import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'

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
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Title
            </Typography>

            <IconButton
              onClick={this._handleGithubIconPress}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Toolbar>

        </AppBar>

        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default withStyles(styles)(App)

import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Settings from '@material-ui/icons/Settings'
import AboutMe from './AboutMe'
import './maintenance.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100%',
    marginTop: 64,
    backgroundColor: '#FAFAFA',
    padding: 50,
  },
  flex: {
    flex: 1,
  },
  leftContainer: {
    height: '100%',
  },
  rightContainer: {
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

  aboutSection: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 42,
    paddingRight: 42,
    backgroundColor: '#fff',
  },
})

class Content extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify={'center'}>
        <Grid container xs={12} sm={9}>
          <Grid item xs={12} sm={4} className={classes.leftContainer}>
            <AboutMe/>
          </Grid>
          <Grid item xs={12} sm={8} className={classes.rightContainer}>
            <Grid
              container
              direction={ 'column' }
              alignItems={ 'center' }
              justify={ 'center' }
              style={{ paddingTop: 100 }}
            >
              <Typography variant="title" style={{ marginBottom: 16 }}>
                Under construction
              </Typography>
              <Settings className="Settings-logo" style={{ fontSize: 40 }}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(Content)

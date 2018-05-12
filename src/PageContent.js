import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import Settings from '@material-ui/icons/Settings'
import AboutMeCard from './AboutMeCard'

const styles = theme => ({
  container: {
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 42,
    paddingRight: 42,
    backgroundColor: '#fff',
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
        <AboutMeCard/>
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

import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AboutMe from './AboutMe'
import PageContent from './PageContent'
import './maintenance.css'

const styles = () => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    paddingTop: 114,
    padding: 50,
    backgroundColor: '#FAFAFA',
  },
  maintenanceContainer: {
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center',
  },
})

class Content extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify={'center'}>
        <Grid container xs={12} sm={9} spacing={40}>
          <Grid item xs={12} sm={4}>
            <AboutMe/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Grid
              container
              direction={ 'column' }
              alignItems={ 'center' }
              justify={ 'center' }
            >
              <PageContent/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(Content)

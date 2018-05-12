import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AboutMe from './AboutMe'
import PageContent from './PageContent'
import './maintenance.css'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100vh',
    paddingTop: 76,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 84,
    },
    backgroundColor: '#FAFAFA',
  },
})

class Content extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify={'center'}>
        <Grid container xs={12} md={9} spacing={40}>
          <Grid item xs={12} md={4}>
            <AboutMe/>
          </Grid>
          <Grid item xs={12} md={8}>
            <PageContent/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(Content)

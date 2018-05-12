import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import AboutMe from './AboutMeSummary'
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
  paddingOverride: {
    [theme.breakpoints.between('sm', 'md')]: {
      paddingRight: '0 !important',
    },
  },
})

class Content extends Component {

  render() {
    const { classes } = this.props
    return (
      <Grid container className={classes.root} justify={'center'}>
        <Grid container xs={12} sm={12} md={11} lg={10} xl={9} spacing={40}>
          <Grid item xs={12} sm={4} className={classes.paddingOverride}>
            <AboutMe/>
          </Grid>
          <Grid item xs={12} sm={8}>
            <PageContent/>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(Content)

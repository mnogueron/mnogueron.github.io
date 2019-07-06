import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AboutMe from './Sections/AboutMe'
import Contact from './Sections/Contact'
import Projects from './Sections/Projects'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#FAFAFA',
    minHeight: '100vh',
    paddingBottom: 120,
  },
  gridRoot: {
    flexGrow: 1,
    paddingTop: 76,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 84,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 94,
    },
    paddingLeft: 40,
    paddingRight: 40,
  },
  text: {
    fontWeight: 300,
    whiteSpace: 'pre-wrap',
  },
}))

const PageContent = (props) => {
  const { innerRef } = props
  const classes = useStyles(props)
  return (
    <div ref={innerRef} className={classes.root}>
      <Grid
        container
        className={classes.gridRoot}
        justify={'center'}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Typography variant={'h5'} className={classes.text}>
            {'This site is currently under construction and is not representing its final state.'}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.gridRoot}
        justify={'center'}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <AboutMe />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.gridRoot}
        justify={'center'}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Projects />
        </Grid>
      </Grid>

      <Grid
        container
        className={classes.gridRoot}
        justify={'center'}
      >
        <Grid item xs={12} sm={12} md={8} lg={6}>
          <Contact />
        </Grid>
      </Grid>
    </div>
  )
}

export default React.forwardRef((props, ref) => <PageContent {...props} innerRef={ref} />)

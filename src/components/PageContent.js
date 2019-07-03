import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import AboutMe from './Sections/AboutMe'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    //backgroundColor: '#FAFAFA',
  },
  gridRoot: {
    flexGrow: 1,
    minHeight: '100vh',
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
  contentContainer: {
    marginBottom: 0,
  },
  backgroundRoll: {
    left: '50%',
    marginLeft: -400,
    top: 160,
    width: 800,
    height: '100%',
    backgroundColor: '#3F515C',
    position: 'absolute',
    zIndex: -1,
  },
}))

const PageContent = (props) => {
  const { innerRef } = props
  const classes = useStyles(props)
  return (
    <div ref={innerRef} className={classes.root}>
      <div className={classes.backgroundRoll} />
      <Grid
        container
        className={classes.gridRoot}
        justify={'flex-end'}
      >
        <Grid item xs={12} sm={12} md={10} lg={8} className={classes.contentContainer}>
          <AboutMe />
        </Grid>
      </Grid>
    </div>
  )
}

export default React.forwardRef((props, ref) => <PageContent {...props} innerRef={ref} />)

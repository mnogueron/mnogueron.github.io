import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  root: props => ({
    flexGrow: 1,
    paddingTop: 76,
    paddingBottom: 76,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 84,
      paddingBottom: 84,
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 114,
      paddingBottom: 114,
    },
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: props.backgroundColor || undefined,
  }),
}))

const Section = (props) => {
  const { children } = props
  const classes = useStyles(props)
  return (
    <Grid
      container
      className={classes.root}
      justify={'center'}
    >
      <Grid item xs={12} md={10} lg={8} xl={7}>
        {children}
      </Grid>
    </Grid>
  )
}

export default Section

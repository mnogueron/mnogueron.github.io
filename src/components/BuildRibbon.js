import React from 'react'
import { makeStyles } from '@material-ui/styles'
import orange from '@material-ui/core/colors/orange'

const useStyles = makeStyles(theme => ({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    overflow: 'hidden',
    transform: 'translateX(40px) translateY(28px) rotate(45deg)',
    paddingBottom: 10,
  },
  root: {
    backgroundColor: orange['600'],
    padding: 2,
    boxShadow: theme.shadows[4],
  },
  innerRibbon: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 12,
    padding: 4,
    paddingLeft: 32,
    paddingRight: 32,
    borderTop: '1px dashed white',
    borderBottom: '1px dashed white',
  },
}))

const BuildRibbon = (props) => {
  const classes = useStyles(props)
  return (
    <div className={classes.container}>
      <div className={classes.root}>
        <div className={classes.innerRibbon}>
          Under construction
        </div>
      </div>
    </div>
  )
}

export default BuildRibbon

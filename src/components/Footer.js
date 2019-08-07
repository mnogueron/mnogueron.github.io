import React from 'react'
import { makeStyles } from '@material-ui/styles'
import grey from '@material-ui/core/colors/grey'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: grey['800'],
    padding: 40,
    fontSize: 16,
    color: theme.palette.common.white,
    textAlign: 'center',
  },
}))

const year = new Date().getFullYear()
const Footer = (props) => {
  const classes = useStyles(props)
  return (
    <div className={classes.root}>
      {`Copyright © ${year} All rights reserved | Portfolio designed and implemented by Matthieu Nogueron with `}
      <Link
        href={'https://reactjs.org'}
        target="_blank"
        rel="noopener noreferrer"
        underline={'always'}
        color="inherit"
      >
        {'React'}
      </Link>
      {' and '}
      <Link
        href={'https://material-ui.com'}
        target="_blank"
        rel="noopener noreferrer"
        underline={'always'}
        color="inherit"
      >
        {'Material-UI'}
      </Link>
    </div>
  )
}

export default Footer

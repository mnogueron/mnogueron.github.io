import React from 'react'
import { makeStyles } from '@material-ui/styles'
import * as ReactDom from 'react-dom'

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: -1000,
    left: -1000,
  },
})

/**
 * Simple hack to add invisible content to the page for SEO purpose
 * @param props
 */
const SEOPortal = (props) => {
  const { children } = props
  const classes = useStyles(props)
  return ReactDom.createPortal(<div className={classes.root}>{children}</div>, document.body)
}

export default SEOPortal

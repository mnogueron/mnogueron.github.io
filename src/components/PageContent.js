import React from 'react'
import { makeStyles } from '@material-ui/styles'
import AboutMe from './Sections/AboutMe'
import Contact from './Sections/Contact'
import Projects from './Sections/Projects'

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FAFAFA',
    minHeight: '100vh',
  },
})

const PageContent = (props) => {
  const { innerRef } = props
  const classes = useStyles(props)
  return (
    <div ref={innerRef} className={classes.root}>
      <AboutMe />
      <Projects />
      <Contact />
    </div>
  )
}

export default React.forwardRef((props, ref) => <PageContent {...props} innerRef={ref} />)

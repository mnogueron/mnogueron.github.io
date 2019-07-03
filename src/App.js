import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import Header from './components/Header'
import PageContent from './components/PageContent'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
})

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop)

const App = (props) => {
  const classes = useStyles(props)
  const contentRef = useRef(null)

  function onExpandClick() {
    scrollToRef(contentRef)
  }

  return (
    <div className={classes.root}>
      <Header onExpandClick={onExpandClick} />
      <PageContent ref={contentRef} />
    </div>
  )

}

export default App

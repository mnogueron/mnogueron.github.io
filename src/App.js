import React, { useRef } from 'react'
import { makeStyles } from '@material-ui/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from './assets/GitHubIcon'
import Content from './Content'
import Header from './components/Header'

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

  function handleGithubIconPress() {
    window.location = 'https://github.com/mnogueron'
  }

  function onExpandClick() {
    scrollToRef(contentRef)
  }

  return (
    <div className={classes.root}>
      <Header onExpandClick={onExpandClick} />
      <div ref={contentRef}></div>
      {/*<AppBar position="absolute">
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            mnogueron.github.io
          </Typography>

          <IconButton
            onClick={handleGithubIconPress}
            color="inherit"
          >
            <GitHubIcon/>
          </IconButton>
        </Toolbar>

      </AppBar>*/}

      <Content/>
    </div>
  )

}

export default App

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import PanZoom from 'react-easy-panzoom'

const useModalStyles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1),
    height: '100%',
    boxSizing: 'border-box',
  },
  panZoomContainer: {
    height: '100%',
    border: `1px solid grey`,
    overflow: 'hidden',
  },
}))

const ReactEasyPanzoomModalContent = (props) => {
  const classes = useModalStyles(props)
  return (
    <div className={classes.container}>
      <PanZoom
        className={classes.panZoomContainer}
        maxZoom={2}
        minZoom={0.3}
        autoCenter
        enableBoundingBox
        realPinch
      >
        <div>You can pan and zoom this text</div>
      </PanZoom>
    </div>
  )
}

export default ReactEasyPanzoomModalContent

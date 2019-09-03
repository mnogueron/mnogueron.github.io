import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import { GA } from '../../utils'

const NewTabIconButton = (props) => {
  const { href, gaAction, children } = props

  function onClick() {
    GA.navigateTo(gaAction)
  }

  return (
    <IconButton
      component={Link}
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer'}
      onClick={onClick}
    >
      {children}
    </IconButton>
  )
}

export default NewTabIconButton

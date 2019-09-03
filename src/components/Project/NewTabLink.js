import React from 'react'
import Link from '@material-ui/core/Link'
import { GA } from '../../utils'

const NewTabLink = (props) => {
  const { href, gaAction, text } = props

  function onClick() {
    GA.navigateTo(gaAction)
  }

  return (
    <Link
      href={href}
      target={'_blank'}
      rel={'noopener noreferrer'}
      onClick={onClick}
    >
      {text}
    </Link>
  )
}

export default NewTabLink

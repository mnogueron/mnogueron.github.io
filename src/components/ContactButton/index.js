import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '../../assets/GitHubIcon'
import LinkedInIcon from '../../assets/LinkedInIcon'
import MailIcon from '@material-ui/icons/Mail'
import FacebookIcon from '../../assets/FacebookIcon'
import Link from '@material-ui/core/Link'
import { GA } from '../../utils'

const ButtonsAttributes = {
  'GitHub': {
    iconComponent: GitHubIcon,
    url: 'https://github.com/mnogueron',
  },
  'LinkedIn': {
    iconComponent: LinkedInIcon,
    url: 'https://www.linkedin.com/in/matthieu-nogueron/',
  },
  'email': {
    iconComponent: MailIcon,
    url: 'mailto:matthieu.nogueron@gmail.com',
  },
  'Facebook': {
    iconComponent: FacebookIcon,
    url: 'https://www.facebook.com/matthieu.nogueron',
  },
}

export const ContactButton = (props) => {
  const { type, buttonProps, iconProps, className, iconClassname, fontSize } = props
  const buttonAttributes = ButtonsAttributes[type]

  if (!buttonAttributes) {
    return null
  }

  const { iconComponent: IconComponent, url } = buttonAttributes

  const shouldOpenTab = type !== 'email'

  function _onClick() {
    GA.navigateTo(`Open ${type}`)
  }

  return (
    <IconButton
      component={Link}
      {...buttonProps}
      onClick={_onClick}
      href={url}
      target={shouldOpenTab ? '_blank' : null}
      rel={shouldOpenTab ? 'noopener noreferrer' : null}
      className={className}
    >
      <IconComponent fontSize={fontSize || 'large'} {...iconProps} className={iconClassname}/>
    </IconButton>
  )
}

export const GithubButton = (props) => <ContactButton {...props} type={'GitHub'} />
export const LinkedInButton = (props) => <ContactButton {...props} type={'LinkedIn'} />
export const EmailButton = (props) => <ContactButton {...props} type={'email'} />
export const FacebookButton = (props) => <ContactButton {...props} type={'Facebook'} />

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
  const { type, buttonProps, iconProps, buttonClassname, iconClassname, fontSize } = props
  const { iconComponent: IconComponent, url } = ButtonsAttributes[type]

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
      target={shouldOpenTab && '_blank'}
      rel={shouldOpenTab && 'noopener noreferrer'}
      className={buttonClassname}
    >
      <IconComponent fontSize={fontSize || 'large'} {...iconProps} className={iconClassname}/>
    </IconButton>
  )
}

export const GithubButton = (props) => <ContactButton {...props} type={'GitHub'} />
export const LinkedInButton = (props) => <ContactButton {...props} type={'LinkedIn'} />
export const EmailButton = (props) => <ContactButton {...props} type={'email'} />
export const FacebookButton = (props) => <ContactButton {...props} type={'Facebook'} />

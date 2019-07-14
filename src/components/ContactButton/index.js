import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import GitHubIcon from '../../assets/GitHubIcon'
import LinkedInIcon from '../../assets/LinkedInIcon'
import MailIcon from '@material-ui/icons/Mail'
import FacebookIcon from '../../assets/FacebookIcon'
import * as ReactGA from 'react-ga'

const openNewTab = (url) => {
  const win = window.open(url, '_blank')
  win.focus()
}
const openGitHub = () => openNewTab('https://github.com/mnogueron')
const openEmail = () => window.location = 'mailto:matthieu.nogueron@gmail.com'
const openLinkedIn = () => openNewTab('https://www.linkedin.com/in/matthieu-nogueron/')
const openFacebook = () => openNewTab('https://www.facebook.com/matthieu.nogueron')

const ButtonsAttributes = {
  'GitHub': {
    iconComponent: GitHubIcon,
    onClick: openGitHub,
  },
  'LinkedIn': {
    iconComponent: LinkedInIcon,
    onClick: openLinkedIn,
  },
  'email': {
    iconComponent: MailIcon,
    onClick: openEmail,
  },
  'Facebook': {
    iconComponent: FacebookIcon,
    onClick: openFacebook,
  },
}

export const ContactButton = (props) => {
  const { type, buttonProps, iconProps, buttonClassname, iconClassname, fontSize } = props
  const { onClick, iconComponent: IconComponent } = ButtonsAttributes[type]

  function _onClick() {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.event({
        category: 'Navigation',
        action: `Open ${type}`,
      })
    }
    return onClick()
  }

  return (
    <IconButton onClick={_onClick} {...buttonProps} className={buttonClassname}>
      <IconComponent fontSize={fontSize || 'large'} {...iconProps} className={iconClassname}/>
    </IconButton>
  )
}

export const GithubButton = (props) => <ContactButton {...props} type={'GitHub'} />
export const LinkedInButton = (props) => <ContactButton {...props} type={'LinkedIn'} />
export const EmailButton = (props) => <ContactButton {...props} type={'email'} />
export const FacebookButton = (props) => <ContactButton {...props} type={'Facebook'} />

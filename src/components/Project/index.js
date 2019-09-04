import React from 'react'
import { FormattedMessage } from 'react-intl'
import ProjectCard from './ProjectCard'
import Projects from './projects'
import NewTabLink from './NewTabLink'
import NewTabIconButton from './NewTabIconButton'
import ReactEasyPanZoomModalDescription from './ReactEasyPanZoomModalDescription'
import ReactEasyPanzoomModalContent from './ReactEasyPanzoomModalContent'

import GitHubIcon from 'mdi-material-ui/GithubCircle'
import NpmIcon from 'mdi-material-ui/NpmVariantOutline'
import GooglePlayIcon from 'mdi-material-ui/GooglePlay'
import StorybookIcon from 'mdi-material-ui/TestTube'

const getComponentFromName = (name) => {
  switch (name) {
    case 'ReactEasyPanZoomModalDescription':
      return <ReactEasyPanZoomModalDescription />
    case 'ReactEasyPanzoomModalContent':
      return <ReactEasyPanzoomModalContent />
    default:
      return null
  }
}

const getIconFromName = (name) => {
  switch (name) {
    case 'github':
      return <GitHubIcon />
    case 'npm':
      return <NpmIcon />
    case 'google-play':
      return <GooglePlayIcon />
    case 'storybook':
      return <StorybookIcon />
    default:
      return null
  }
}

/**
 * Export a list of object that contains a key and the component to render
 * for each project.
 * @type {{ProjectComponent: (function(*): *), key: string}[]}
 */
export const ProjectCards = Projects.map(project => ({
  key: project.key,
  ProjectComponent: (props) => {
    const { title, subtitle, description, modalLeftSection, backgroundImage, buttons } = project
    return (
      <ProjectCard
        title={<FormattedMessage id={title} /> }
        subtitle={<FormattedMessage id={subtitle} /> }
        description={
          description.useComponent ?
            getComponentFromName(description.useComponent)
            : (
              <FormattedMessage
                id={description.text}
                values={{
                  b: msg => <b>{msg}</b>,
                  a: () => {
                    return description.link ? (
                      <div style={{ marginTop: 16, textAlign: 'center' }}>
                        <NewTabLink
                          href={description.link.url}
                          gaAction={description.link.gaAction}
                          text={description.link.text}
                        />
                      </div>
                    ) : null
                  },
                }}
              />
            )}
        modalLeftSection={
          modalLeftSection && modalLeftSection.useComponent ?
            getComponentFromName(modalLeftSection.useComponent) : null
        }
        backgroundImage={backgroundImage}
        actionButtons={buttons.map(({ key, url, gaAction, icon }) => (
          <NewTabIconButton key={key} href={url} gaAction={gaAction}>
            {getIconFromName(icon)}
          </NewTabIconButton>
        ))}
        {...props}
      />
    )
  },
}))

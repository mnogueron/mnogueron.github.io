import React from 'react'
import { FormattedMessage } from 'react-intl'
import ProjectCard from './ProjectCard'
import Projects from './projects'
import NewTabLink from './NewTabLink'
import NewTabIconButton from './NewTabIconButton'

import GitHubIcon from 'mdi-material-ui/GithubCircle'
import NpmIcon from 'mdi-material-ui/NpmVariantOutline'
import GooglePlayIcon from 'mdi-material-ui/GooglePlay'
import StorybookIcon from 'mdi-material-ui/TestTube'

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
    const { title, subtitle, description, ModalLeftSectionComponent, backgroundImage, buttons } = project
    const { isComponent, Component } = description
    return (
      <ProjectCard
        title={<FormattedMessage id={title} /> }
        subtitle={<FormattedMessage id={subtitle} /> }
        description={ isComponent ? < Component /> : (
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
        modalLeftSection={ModalLeftSectionComponent ? <ModalLeftSectionComponent /> : null}
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

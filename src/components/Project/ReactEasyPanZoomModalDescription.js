import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormattedMessage } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGithubReactEasyPanzoomData } from '../../actions/appThunk'
import NewTabLink from './NewTabLink'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  versionContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
  },
  version: {
    marginLeft: theme.spacing(2),
  },
}))

const ReactEasyPanZoomModalDescription = (props) => {
  const [loading, setLoading] = useState(false)
  const [versionError, setVersionError] = useState(false)
  const dispatch = useDispatch()
  const classes = useStyles(props)
  const latestVersion = useSelector(state => state.app.reactEasyPanZoomLatestVersion)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        await dispatch(fetchGithubReactEasyPanzoomData())
      } catch(e) {
        console.error('An error occurred while loading react-easy-panzoom repo data', e)
        setVersionError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dispatch])

  return (
    <React.Fragment>
      <FormattedMessage
        id={'section.projects.react-easy-panzoom.description'}
        values={{
          a: () => (
            <div style={{ marginTop: 16, textAlign: 'center' }}>
              <NewTabLink
                href={'https://github.com/mnogueron/react-easy-panzoom'}
                gaAction={'Open GitHub react-easy-panzoom'}
                text={'github.com/mnogueron/react-easy-panzoom'}
              />
            </div>
          ),
          b: msg => <b>{msg}</b>,
        }}
      />

      {
        !versionError && (
          <div className={classes.versionContainer}>
            <FormattedMessage id={'general.latestVersion'} />
            <div className={classes.version}>
              { loading ? <CircularProgress size={20} /> : <b>{latestVersion}</b> }
            </div>
          </div>
        )
      }
    </React.Fragment>
  )
}

export default ReactEasyPanZoomModalDescription

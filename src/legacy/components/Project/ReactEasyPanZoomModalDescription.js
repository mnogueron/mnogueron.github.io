import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {FormattedMessage} from 'react-intl';
import NewTabLink from './NewTabLink';

const useStyles = makeStyles(theme => ({
  versionContainer: {
    marginTop: theme.spacing(6),
    display: 'flex',
    alignItems: 'center',
  },
  version: {
    marginLeft: theme.spacing(2),
  },
}));

const ReactEasyPanZoomModalDescription = props => {
  const classes = useStyles(props);
  const latestVersion = '0.4.4';

  return (
    <React.Fragment>
      <FormattedMessage
        id={'section.projects.react-easy-panzoom.description'}
        values={{
          a: () => (
            <div style={{marginTop: 16, textAlign: 'center'}}>
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

      <div className={classes.versionContainer}>
        <FormattedMessage id={'general.latestVersion'} />
        <div className={classes.version}>
          <b>{latestVersion}</b>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReactEasyPanZoomModalDescription;

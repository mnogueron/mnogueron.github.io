import 'es5-shim';
import 'es6-shim';

import React from 'react';
//import ReactDOM from 'react-dom'
//import registerServiceWorker from './registerServiceWorker'
import * as ReactGA from 'react-ga';
import Root from './Root';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-143826195-1');
  ReactGA.pageview('Homepage');
}

function WrappedApp() {
  return <Root />;
}

export default WrappedApp;

//ReactDOM.render(<WrappedApp/>, document.getElementById('root'))
//registerServiceWorker()

import React, {useEffect} from 'react';
import {IntlProvider} from 'react-intl';
import {getMessages, getUserLocale} from './i18n';
import App from './App';
import {useDispatch, useSelector} from 'react-redux';
import {setLocale} from './actions/appActions';

const Root = () => {
  const userLocale = useSelector(state => state.app.locale);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userLocale) {
      dispatch(setLocale(getUserLocale()));
    }
  }, [dispatch, userLocale]);

  const locale = userLocale || getUserLocale();

  return (
    <IntlProvider key={locale} locale={locale} messages={getMessages(locale)}>
      <App />
    </IntlProvider>
  );
};

export default Root;

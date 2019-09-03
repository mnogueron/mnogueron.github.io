import React from 'react'
import { mount } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ReactEasyPanZoomModalDescription from './ReactEasyPanZoomModalDescription'
import TestProviders from '../../TestProviders'

const mockStore = configureMockStore([thunk])

const store = mockStore({
  app: {
    locale: 'en',
    latestVersion: null,
  },
})

const mountWithProvider = (children) => mount(
  <TestProviders store={store} locale={'en'}>
    {children}
  </TestProviders>
)

test('renders without crashing', () => {
  mountWithProvider(<ReactEasyPanZoomModalDescription />)
})

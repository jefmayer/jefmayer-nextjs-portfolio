/* eslint-disable react/function-component-definition, react/prop-types */
import React from 'react';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import '../scss/layout.scss';

const middleware = [thunk];
// production
if (process.env.NODE_ENV !== 'development') {
  middleware.push(createLogger());
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware),
);

export default ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);
/* eslint-disable react/function-component-definition, react/prop-types */

import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import '../scss/layout.scss';

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>{
    const mws = getDefaultMiddleware();
    if (
      process.env.NODE_ENV !== 'production' &&
      typeof window !== 'undefined'
    ) {
      mws.push(createLogger({ collapsed: true, duration: true }));
    }
    return mws;
  },
});

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
);
App.displayName = 'App';
export default App;

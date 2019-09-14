import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { store, persistor } from './base/configureStore';
import App from './base/App';

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install();
}

/**
 * Do feature detection, to figure out which polyfills needs to be imported.
 */
async function loadPolyfills() {
  if (typeof window.Promise === 'undefined') {
    await import('promise-polyfill/src/polyfill');
  }
}
loadPolyfills();

const basename = '/';
const AppBundle = Component => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter basename={basename}>
        <Component />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

const render = component =>
  Loadable.preloadReady().then(() =>
    ReactDOM.hydrate(AppBundle(component), document.getElementById('root'))
  );

if (module.hot) {
  module.hot.accept('./base/App', () => {
    const NextRootContainer = import('./base/App').default;
    render(NextRootContainer, true);
  });
}

render(App);

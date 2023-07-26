import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import "./styles/reset.css";
import App from "./components/App";
import configureStore from "./store/index";
import { BrowserRouter } from "react-router-dom";
import csrfFetch, { restoreCSRF } from './store/csrf';
import * as sessionActions from './store/session';
import { login } from './store/session';
import { logout } from './store/session';


const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.login = login;
  window.logout = logout;
  window.signup = sessionActions.signup;

}

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApp);
} else {
  renderApp();
}


// function initialyzeApp() {

// }
// if (
//   sessionStorage.getItem("currentUser") === null ||
//   sessionStorage.getItem("X-CSRF-Token") === null
// ) {
//   store.dispatch(sessionActions.restoreSession()).then(root);
// } else {
//   root();
// }

// if (sessionStorage.getItem("X-CSRF-Token") === null) {
//   restoreCSRF().then(root);
// } else {
//   root();
// }

// restoreSession().then(initialyzeApp);

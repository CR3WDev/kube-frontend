import PropTypes from "prop-types";
import React from "react";

import { connect } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes";

// Import all middleware
import Authmiddleware from "./routes/route";

// layouts Format
import NonAuthLayout from "./components/NonAuthLayout";
import VerticalLayout from "./components/VerticalLayout/";

// Import scss
import "./assets/scss/theme.scss";

// Import Firebase Configuration file
// import { initFirebaseBackend } from "./helpers/firebase_helper"

import fakeBackend from "/src/helpers/AuthType/fakeBackend";

// Activating fake backend
fakeBackend();

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_APP_APIKEY,
//   authDomain: import.meta.env.VITE_APP_AUTHDOMAIN,
//   databaseURL: import.meta.env.VITE_APP_DATABASEURL,
//   projectId: import.meta.env.VITE_APP_PROJECTID,
//   storageBucket: import.meta.env.VITE_APP_STORAGEBUCKET,
//   messagingSenderId: import.meta.env.VITE_APP_MESSAGINGSENDERID,
//   appId: import.meta.env.VITE_APP_APPID,
//   measurementId: import.meta.env.VITE_APP_MEASUREMENTID,
// };

// init firebase backend
// initFirebaseBackend(firebaseConfig)

const App = (props) => {
  const Layout = VerticalLayout;
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);

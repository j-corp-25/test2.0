import React from "react";
import GlueTube from "./GlueTube/GlueTube";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import LoginFormPage from "./LoginFormPage/LoginFormPage";
import SignUpForm from "./SignUpForm/SignUpForm";
import * as sessionActions from "../store/session";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import VideoForm from "./Videos/VideoForm/VideoForm"
import VideoShow from "./Videos/VideoShow/VideoShow"  



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sessionActions.restoreSession());
  }, [dispatch]);

  return (
    <Router>
      <Switch>
        <Route path="/videos/:videoId" component={VideoShow} />
        <Route path="/upload" component={VideoForm} />
        <Route path="/login" component={LoginFormPage} />
        <Route path="/signup" component={SignUpForm} />
        <Route path="/" exact component={GlueTube} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;

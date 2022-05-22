import "./App.css";
import React, { useEffect, useState } from "react";

import { BrowserRouter, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import {
  AfterConnect,
  CheckingReward,
  Finish,
  Home,
  PrivateNote,
  SecretClaim,
  WaitngClaim,
  FinishFail,
  Error,
} from "../pages";
import { Canvas, Header, Card } from "../comps/index";
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as nftActions } from "../redux/modules/nft";

import { ethers } from "ethers";

import { useDispatch, useSelector } from "react-redux";

function App() {
  const { ethereum } = window;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.selectedAddress);

  React.useEffect(() => {
    dispatch(userActions.loginCheckDB());
  }, []);

  return (
    <React.Fragment>
      <ConnectedRouter history={history}>
        {!isLoggedIn ? (
          <>
            <Header />
            <Canvas />
            <Route path="/" exact component={Home} />
            <Route path="/*" exact component={Error} />
          </>
        ) : (
          <>
            <Header connected />
            <Canvas />
            <Route path="/" exact component={AfterConnect} />
            <Route path="/1" exact component={CheckingReward} />
            <Route path="/2" exact component={AfterConnect} />
            <Route path="/3" exact component={PrivateNote} />
            <Route path="/4" exact component={SecretClaim} />
            <Route path="/5" exact component={WaitngClaim} />
            <Route path="/6" exact component={Finish} />
            <Route path="/fail" exact component={FinishFail} />
          </>
        )}
      </ConnectedRouter>
    </React.Fragment>
  );
}

export default App;

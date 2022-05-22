import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../comps/index";
import { history } from "../redux/configureStore";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
} from "../elements/index";
import { WaitingCreatingProof } from "./index";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as nftActions } from "../redux/modules/nft";
import { actionCreators as userActions } from "../redux/modules/user";

function Error(props) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    history.push("/");
  }, []);

  return <></>;
}

export default Error;

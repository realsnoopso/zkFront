import React, { useState, useEffect, Children } from "react";
import { Header, Card, ButtonWrap } from "../components/index";
import { history } from "../redux/configureStore";
import {
  Input,
  Textarea,
  RadioButton,
  Button,
  Text,
  Spacing,
} from "../elements/index";

function AfterConnect(props) {
  function onClickRight() {
    console.log("hi");
    history.push("/3");
  }

  return (
    <Card>
      <Text bold>Congrlatulate!</Text>
      <Spacing size="20px" />
      <Text>You are a 7rd winner of this stage!</Text>
      <Spacing size="20px" />
      <Text>Claim your NFT.</Text>
      <Spacing size="20px" />
      <RadioButton name="claimType" id="1" label="Claim">
        Receive reward with your original address
      </RadioButton>
      <Spacing size="20px" />
      <RadioButton name="claimType" id="2" label="Secret Claim">
        Receive reward with your second address <br /> to hide your score from
        other players
      </RadioButton>
      <Spacing size="20px" />
      <ButtonWrap oneButton onClickRight={onClickRight} btnRight="Next" />
    </Card>
  );
}

export default AfterConnect;

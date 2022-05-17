import React from "react";
import styled from "styled-components";
import { Button, Link, Text } from "../elements/index";

const Header = (props) => {
  const { connected, address } = props;

  const styles = {};

  return (
    <HeaderContainer {...styles}>
      {connected ? (
        <Flex>
          <Text margin="0 8px 0 0">0x1238axa9324345</Text>
          <Button small>Disconnect Wallet</Button>
        </Flex>
      ) : (
        <Flex>
          <Button small>Connect Wallet</Button>
        </Flex>
      )}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  height: fit-content;
  padding: 8px;
  width: 100%;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

import detectEthereumProvider from "@metamask/detect-provider";
import { Strategy, ZkIdentity } from "@zk-kit/identity";
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols";
// import { providers, ethers } from "ethers";
import Head from "next/head";
import React from "react";
import createIdentityCommitments from "./identity-test";
import AttestationMinter from "../../artifacts/contracts/AttestationMinter/AttestationMinter.json";
import { Contract, providers, utils, Wallet, ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
const JSONbigNative = require("json-bigint")({ useNativeBigInt: true });
import Cors from "cors";

async function mint(
  correctMinter: any,
  nullifierHash: any,
  solidityProof: any
) {
  // console.log("correctMinter >>>>>>>>>>>> ", correctMinter);
  // console.log("nullifierHash >>>>>>>>>>>> ", nullifierHash);
  // console.log("solidityProof >>>>>>>>>>>> ", solidityProof);

  // const body = JSONbigNative.parse(JSONbigNative.stringify(req.body));
  // console.log(">>> body", body);

  // const correctMinter = body.correctMinter;
  // const nullifierHash = body.nullifierHash.toString();
  // const solidityProof = body.solidityProof;

  // const contractAddress = "0x556F664A59bFB2e432fA9fd5800752bC59116e58" // mumbai testnet
  const contractAddress = "0x0e49820ceed405f6560d724333b45586c49e6fb1"; // kovan testnet
  const contract = new Contract(contractAddress, AttestationMinter.abi);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  const signer = new Wallet(`${process.env.PRIVATE_KEY_MINTER}`, provider);
  const contractOwner = contract.connect(signer);
  let txHash;

  try {
    let tx = await contractOwner.mint(
      correctMinter,
      nullifierHash,
      solidityProof,
      {
        gasLimit: 20000000,
      }
    );
    await tx.wait();
    console.log("Record set " + tx.hash);

    return {
      status_code: 200,
      txHash: tx.hash,
    };
  } catch (error: any) {
    return {
      status_code: 500,
      message: error.toString() || "Unknown error!",
    };
  }

  // console.log(correctMinter, nullifierHash, solidityProof);

  // const response = await fetch("http://localhost:3000/api/mint", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     correctMinter: correctMinter,
  //     nullifierHash: nullifierHash,
  //     solidityProof: solidityProof,
  //   }),
  // });

  // const body = await response.json();
  // console.log("body: ", body);

  // if (response.status === 500) {
  //   const errorMessage = await response.text();

  //   console.log(errorMessage);
  // } else {
  //   console.log("Your anonymous greeting is onchain :)");
  // }
}

export { mint };

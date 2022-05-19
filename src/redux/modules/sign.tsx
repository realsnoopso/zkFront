import detectEthereumProvider from "@metamask/detect-provider";
import { Strategy, ZkIdentity } from "@zk-kit/identity";
import { generateMerkleProof, Semaphore } from "@zk-kit/protocols";
import { providers, ethers } from "ethers";
import Head from "next/head";
import React from "react";
import createIdentityCommitments from "./identity-test";

const sign = async () => {
  console.log("Creating your Semaphore identity...");

  const provider: any = await detectEthereumProvider();

  await provider.request({ method: "eth_requestAccounts" });

  const ethersProvider = new providers.Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  const address = await signer.getAddress();
  const message = await signer.signMessage(address);
  console.log("ethersProvider:" + ethersProvider);
  console.log("signer:" + signer);
  console.log("address:" + address);
  console.log("message:" + message);

  const identity = new ZkIdentity(Strategy.MESSAGE, message);
  const identityCommitment = identity.genIdentityCommitment();
  console.log(">>>>>>>>>>>>>>>>>>> ", identityCommitment);
  const identityCommitments = createIdentityCommitments();
  console.log("identityCommitments:" + identityCommitments);

  const merkleProof = generateMerkleProof(
    20,
    BigInt(0),
    identityCommitments,
    identityCommitment
  );

  let correctMinter;

  //   setLogs("Creating your Semaphore proof...");

  const nowMintingWinner = message.slice(0, 31);
  correctMinter = ethers.utils.formatBytes32String(nowMintingWinner);

  const witness = Semaphore.genWitness(
    identity.getTrapdoor(),
    identity.getNullifier(),
    merkleProof,
    merkleProof.root,
    nowMintingWinner
  );

  const { proof, publicSignals } = await Semaphore.genProof(
    witness,
    "./semaphore.wasm",
    "./semaphore_final.zkey"
  );
  const solidityProof = Semaphore.packToSolidityProof(proof);

  console.log(
    "correctMinter: ",
    correctMinter,
    "nullifierHash: ",
    publicSignals.nullifierHash,
    "solidityProof: ",
    solidityProof
  );

  //   setLogs("Created your Semaphore proof. Check your console.");
};

export { sign };

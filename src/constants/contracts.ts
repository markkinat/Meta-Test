import { ethers } from "ethers";
import TestingAbi from "./Testing.json";
import { JsonRpcSigner } from "ethers";
import { JsonRpcProvider } from "ethers";

export const getChatContract = (providerOrSigner: JsonRpcSigner | JsonRpcProvider) =>
    new ethers.Contract(
        import.meta.env.VITE_CHAT_ADDRESS,
        TestingAbi,
        providerOrSigner
    );



export const getENSContract = (providerOrSigner: JsonRpcSigner | JsonRpcProvider) =>
    new ethers.Contract(
        import.meta.env.VITE_ENS_ADDRESS,
        ENSAbi,
        providerOrSigner
    );

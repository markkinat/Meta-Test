import { ethers } from "ethers";
import TestingAbi from "./Testing.json";
import { JsonRpcSigner } from "ethers";
import { JsonRpcProvider } from "ethers";

export const getTestingContract = (providerOrSigner: JsonRpcSigner | JsonRpcProvider) =>
    new ethers.Contract(
        import.meta.env.VITE_ENS_ADDRESS,
        TestingAbi,
        providerOrSigner
    );


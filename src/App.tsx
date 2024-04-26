import { useState } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import  TestingAbi  from "./constants/Testing.json";
import { getTestingContract } from "./constants/contracts";
import { readOnlyProvider } from "./constants/providers";
const App = () => {
  const [amount, setAmount] = useState(0);
  const [balances, setBalances] = useState(0);

  const { walletProvider } = useWeb3ModalProvider();
  const { isConnected, chainId, address } = useWeb3ModalAccount();
  // const provider = new ethers.BrowserProvider(walletProvider!);

  const changeBalance = async () => {
    const transaction = {
      from: address?.toString(),
      amount: amount.toString(),
    };
    const toastId = toast.loading("Processing");

    const provider = new ethers.BrowserProvider(walletProvider!);

    try {
      const signer = await provider.getSigner();
      const signature = await signer.signMessage(JSON.stringify(transaction));
      const response = await fetch(
        `${import.meta.env.VITE_gasless_url}change-balance`,
        {
          method: "POST",
          body: JSON.stringify({ ...transaction, signature }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jsonResponse = await response.json();

      if (jsonResponse.success) {
        toast.success(jsonResponse.message);
      } else {
        toast.error(jsonResponse.message);
      }
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("SOMETHING_WENT_WRONG");
    }
  };

  const getBalance = async () => {
    try{
      const contract = getTestingContract(readOnlyProvider);
      const result = await contract.balances(address?.toString());
      setBalances(result);
      console.log(balances);
      console.log("resulting...", result);
    }catch(error) {
      console.error(error);
    }
  }

  return (
    <div>
      {isConnected ? (
        <>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          <button onClick={changeBalance}>Change Balance</button>
        </>
      ) : (
        <>
        <p>Connect your wallet to continue</p>
        <w3m-button/>
        </>
      )}
      <br /> <br />
      {balances.toString()}
      <button onClick={getBalance}>Get Account Balance</button>
    </div>
  );
};

export default App;
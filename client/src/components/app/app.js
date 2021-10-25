import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { Button } from 'semantic-ui-react';
import EthAddress from '../ethAddress/ethAddress';
import './app.css';

function App() {
    const [chainId, setCurrentChainID] = useState();
    const [account, setCurrentAccount] = useState();
    const [balance, setCurrentBalance] = useState(0);
    const [isLogged, setIsLogged] = useState(false);

    let web3 = null;

    useEffect(() => {
        window.ethereum.on('chainChanged', _chainId => {
            console.log(_chainId);
            setCurrentChainID(() => parseInt(_chainId, 16));
        });
    }, []);

    const ConnectWallet = async () => {
        console.log('Try to connect');

        try {
            const id = await window.ethereum.request({ method: 'eth_chainId' });
            setCurrentChainID(() => parseInt(id, 16));
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsLogged(true);
            setCurrentAccount(accounts[0]);
            setCurrentBalance(await web3.eth.getBalance(accounts[0]));
            return accounts[0];
        } catch (err) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('User Rejected Request');
            } else if (err.code === -32002) {
                console.log('User Request Pending - Metamask was locked by password');
            } else {
                console.error(err);
            }
        }
    };

    const SignIn = async () => {
        const provider = await detectEthereumProvider();
        web3 = new Web3(provider);

        if (!provider) {
            console.log('Wallet not found please install Metamask');
        } else {
            const address = await ConnectWallet();
            if (address) {
                console.log(`Connected to address ${address}`);
            }
        }
    };

    const SignOut = async () => {
        setIsLogged(false);
    };

    return (
        <div className="App">
            Hello ToDo List
            <Button onClick={SignIn}>Connect</Button>
            <h1>chainId is {chainId}</h1>
            <h2>Account is {account}</h2>
            <EthAddress balance={balance} address={account} />
        </div>
    );
}

export default App;

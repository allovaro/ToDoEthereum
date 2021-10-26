import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { Button, Grid } from 'semantic-ui-react';
import TodoFactory from '../../contracts/TodoFactory.json';
import TodoList from '../../contracts/TodoList.json';
import EthAddress from '../ethAddress/ethAddress';
import MessageList from '../MessageList/MessageList';
import './app.css';

function App() {
    const [chainId, setCurrentChainID] = useState();
    const [account, setCurrentAccount] = useState();
    const [balance, setCurrentBalance] = useState('0');
    const [isLogged, setIsLogged] = useState(false);
    const [messages, setMessages] = useState([]);

    let web3 = null;
    let contract;

    const addMessage = (header, content) => {
        setMessages(prev => [...prev,
            { header, content }]);
    };

    const removeMessage = index => {
        setMessages(prev => (
            prev.filter((item, ind) => (
                ind !== index
            ))
        ));
    };

    useEffect(() => {
        window.ethereum.on('chainChanged', _chainId => {
            const id = parseInt(_chainId, 16);
            setCurrentChainID(id);
            if (id !== 1) {
                addMessage('Chain changed', 'You are using Test Network');
            } else {
                addMessage('Chain changed', 'You are using Mainnet');
            }
        });
    }, []);

    useEffect(() => {
        window.ethereum.on('accountsChanged', async accounts => {
            if (web3) {
                setCurrentBalance(web3.utils.fromWei(await web3.eth.getBalance(accounts[0])));
            }

            setCurrentAccount(accounts[0]);
            addMessage('Account changed', `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(
                accounts[0].length - 4, accounts[0].length,
            )}`);
        });
    }, []);

    const CreateNewGoalList = async acc => {
        await contract.methods.createTodo().send({ from: acc });
        console.log('list created');
    };

    const GetTodoFactoryContract = async () => {
        const deployedNetwork = TodoFactory.networks[chainId];
        contract = new web3.eth.Contract(TodoList.abi, deployedNetwork && deployedNetwork.address);
        CreateNewGoalList();
    };

    const ConnectWallet = async () => {
        try {
            const id = await window.ethereum.request({ method: 'eth_chainId' });
            setCurrentChainID(() => parseInt(id, 16));
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsLogged(true);
            setCurrentAccount(accounts[0]);
            const accBalance = await web3.eth.getBalance(accounts[0]);
            setCurrentBalance(web3.utils.fromWei(accBalance, 'ether'));
            addMessage('Metamask', 'Metamask connected');
            // GetTodoFactoryContract(id);
            // CreateNewGoalList(accounts[0]);
            return accounts[0];
        } catch (err) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                addMessage('Metamask', 'User Rejected Request');
            } else if (err.code === -32002) {
                addMessage('Metamask', 'Metamask was locked by password');
            } else {
                addMessage('Metamask', 'Something goes wrong...');
            }
        }
    };

    const SignIn = async () => {
        const provider = await detectEthereumProvider();
        web3 = new Web3(provider);

        if (!provider) {
            addMessage('Metamask', 'Wallet not found please install Metamask');
        } else {
            const address = await ConnectWallet();
            if (address) {
                setIsLogged(true);
                addMessage('Metamask', `Connected to ${address.slice(0, 6)}...${address.slice(
                    address.length - 4, address.length,
                )}`);
            }
        }
    };

    const SignOut = async () => {
        setIsLogged(false);
        setCurrentBalance('0');
        setCurrentAccount('');
        setCurrentChainID('');
        addMessage('ToDo DApp', 'You was logged out');
    };

    return (
        <div className="App">
            <Grid centered columns={3}>
                <Grid.Column width={2}>

                </Grid.Column>
                <Grid.Column width={12}>
                    Hello ToDo List
                    <Button onClick={SignIn}>Connect</Button>
                    <Button onClick={SignOut}>Disconnect</Button>
                    <Button onClick={GetTodoFactoryContract}>New List</Button>
                    <h4>{isLogged ? 'Logged' : 'No Logged in'}</h4>
                    <h1>chainId is {chainId}</h1>
                    <h2>Account is {account}</h2>
                    <EthAddress balance={balance} address={account} />
                </Grid.Column>
                <Grid.Column width={2}>
                    <MessageList
                        messages={messages}
                        onRemove={removeMessage}
                    />
                </Grid.Column>
            </Grid>
        </div>
    );
}

export default App;

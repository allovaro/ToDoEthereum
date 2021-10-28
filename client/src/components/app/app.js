import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { Button, Grid } from 'semantic-ui-react';
import TodoFactory from '../../contracts/TodoFactory.json';
import TodoList from '../../contracts/TodoList.json';
import Head from '../head/head';
import TaskComponent from '../taskComponent/taskComponent';
import MessageList from '../MessageList/MessageList';
import NewTaskList from '../newTaskList/newTaskList';
import './app.css';
import logo from './brickwall.jpg';

function App() {
    const [chainId, setCurrentChainID] = useState();
    const [account, setCurrentAccount] = useState();
    const [todoAddress, setTodoAddress] = useState('');
    const [balance, setCurrentBalance] = useState('0');
    const [isLogged, setIsLogged] = useState(false);
    const [messages, setMessages] = useState([]);
    const [web3, setWeb3] = useState();
    const [contractFactory, setFactory] = useState();
    const [contractTodo, setTodo] = useState();

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
            if (isLogged) {
                if (web3) {
                    setCurrentBalance(web3.utils.fromWei(await web3.eth.getBalance(accounts[0])));
                }

                setCurrentAccount(accounts[0]);
                addMessage('Account changed', `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(
                    accounts[0].length - 4, accounts[0].length,
                )}`);
            }
        });
    }, []);

    const GetTodoListAddress = async () => {
        const ret = await contractFactory.methods.getTodoByOwner().call();
        if (ret !== '0x0000000000000000000000000000000000000000') {
            setTodoAddress(ret);
            return true;
        }
        return false;
    };

    const CreateNewGoalList = async () => {
        await contractFactory.methods.createTodo().send({ from: account });
        const instanceAddress = await contractFactory.methods.getTodoByOwner().call();
        const instance = new web3.eth.Contract(TodoList.abi, instanceAddress);
        setTodo(instance);
    };

    const CreateGoalList = async () => {
        const instance = new web3.eth.Contract(TodoList.abi, todoAddress);
        setTodo(instance);
    };

    const ConnectWallet = async web3Instance => {
        try {
            const id = await window.ethereum.request({ method: 'eth_chainId' });
            setCurrentChainID(() => parseInt(id, 16));
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setIsLogged(true);
            setCurrentAccount(accounts[0]);
            const accBalance = await web3Instance.eth.getBalance(accounts[0]);
            setCurrentBalance(web3Instance.utils.fromWei(accBalance, 'ether'));
            const deployedNetwork = TodoFactory.networks[parseInt(id, 16)];
            const contract = new web3Instance.eth.Contract(TodoFactory.abi,
                deployedNetwork && deployedNetwork.address);
            const ret = await contract.methods.getTodoByOwner().call();
            if (ret !== '0x0000000000000000000000000000000000000000') {
                setTodoAddress(ret);
                const instanceTodo = new web3Instance.eth.Contract(TodoList.abi, ret);
                setTodo(instanceTodo);
            }
            setFactory(contract);
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
        const web3Instance = new Web3(provider);
        setWeb3(web3Instance);

        if (!provider) {
            addMessage('Metamask', 'Wallet not found please install Metamask');
        } else {
            const address = await ConnectWallet(web3Instance);
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
        setFactory();
        setTodo();
        addMessage('ToDo DApp', 'You was logged out');
    };

    const Logging = () => {
        if (isLogged) {
            SignOut();
        } else {
            SignIn();
        }
    };

    return (
        <div
            className="App"
            style={{
                backgroundImage:
            `url(${logo})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                height: '100vh',
            }}
        >
            <Head
                isLogged={isLogged}
                sign={Logging}
                balance={balance}
                account={account}
            />
            <Grid centered columns={3}>
                <Grid.Column width={2}>

                </Grid.Column>
                <Grid.Column width={12}>
                    <NewTaskList setOpen={CreateNewGoalList} />
                    <Button onClick={CreateNewGoalList}>New Task List</Button>
                    <TaskComponent
                        account={account}
                        contract={contractTodo}
                    />

                    <h1>chainId is {chainId}</h1>
                    <h2>Account is {account}</h2>
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

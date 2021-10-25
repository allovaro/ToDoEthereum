import Web3 from 'web3';

const ethEnabled = async () => {
    if (window.ethereum) {
        console.log('Metamask detected');
        return true;
    } else {
        console.log('Metamask not detected please install it');
        return false;
    }
};

const onClickConnect = async () => {
    try {
        // Will open the MetaMask UI
        // You should disable this button while the request is pending!
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
        console.error(error);
    }
};

const getAccounts = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
}

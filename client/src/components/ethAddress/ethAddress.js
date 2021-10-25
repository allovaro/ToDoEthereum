import React from 'react';
import styled from 'styled-components';
import JazzyIcon from '../jazzyIcon/jazzyIcon';

const Container = styled.div`
display: flex;
justify-content: space-between;
background-color: #363636;
padding: 4px 0;
width: 250px;
box-sizing: border-box;
border-radius: 10px;
color: white;
font-size: 1.1em;
font-weight: 500;
font-family: sans-serif;
`;

const Address = styled.div`
display: flex;
justify-content: space-between;
padding: 4px 10px;
height: 2.1em;
width: auto;
box-sizing: border-box;
border-radius: 10px;
color: white;
background-color: #040a30;
&:hover {
    border-style: solid;
    border-width: 1px;
    border-color: #708090;
}
`;

const Balance = styled.div`
display: flex;
justify-content: space-between;
padding: 6px 5px;
height: 2.1em;
width: auto;
box-sizing: border-box;
border-radius: 10px;
color: white;
`;

const Paragraph = styled.p`
padding-right: 8px;
`;

function EthAddress(props) {
    if (!props.address) {
        return <div />;
    }

    return (
        <Container>
            <Balance>{props.balance} ETH</Balance>
            <Address>
                <Paragraph>
                    {props.address && `${props.address.slice(0, 6)}...${props.address.slice(
                        props.address.length - 4, props.address.length,
                    )}`}
                </Paragraph>
                <JazzyIcon address={props.address} size={20} />
            </Address>
        </Container>
    );
}

export default EthAddress;

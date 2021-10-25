import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
width: 100px;
padding: 10px 4px;
margin-right: 1rem;
text-align: center;
border-radius: 10px;
background-color: #363636;
color: #e00404;
font-size: 1.1em;
font-weight: 500;
font-family: sans-serif;
`;

const ids = {
    1: 'Mainnet',
    2: 'Expanse',
    3: 'Ropsten',
    4: 'Rinkeby',
    5: 'Goerli',
    6: 'Classic',
    7: 'ThaiChain',
    8: 'Ubiq',
    9: 'UbiqTest',
    42: 'Kovan',
};

function ChainId(props) {
    return (
        <Title>{ids[props.id]}</Title>
    );
}

export default ChainId;

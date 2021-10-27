import React, { useState } from 'react';
import { Menu, Input } from 'semantic-ui-react';
import NeonText from '../neonText/neonText';
import EthAddress from '../ethAddress/ethAddress';

function Header(props) {
    const handleItemClick = (e, { name }) => {
        console.log('click');
    };

    return (
        <Menu secondary inverted size="huge">
            <Menu.Item>
                <NeonText text="Todo DApp" />
            </Menu.Item>
            <Menu.Item
                name="home"
                onClick={handleItemClick}
            />
            <Menu.Menu position="right">
                <EthAddress balance={props.balance} address={props.account} />
                <Menu.Item>
                    <Input icon="search" placeholder="Search..." />
                </Menu.Item>
                <Menu.Item
                    name="signin"
                    onClick={props.sign}
                >
                    {props.isLogged ? 'Sign Out' : 'Sign In'}
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default Header;

import React, { useState } from 'react';
import {
    Segment, Header, Grid, Button, Input,
} from 'semantic-ui-react';
import TaskList from '../taskList/taskList';

function TaskComponent(props) {
    const [inputField, setInputField] = useState('');

    const { account, contract } = props;

    const inputChanged = (event, { value }) => {
        setInputField(value);
    };

    const CreateTask = async () => {
        await contract.methods.createTask(inputField).send({ from: account });
    };

    return (
        <Segment secondary raised>
            <Grid divided>
                <Grid.Row verticalAlign="middle">
                    <Header as="h2" color="purple" floated="left">
                        Tasks
                    </Header>
                </Grid.Row>
                <Grid.Row verticalAlign="middle">
                    <Button primary onClick={CreateTask}>New task</Button>
                    <Input onChange={inputChanged} placeholder="Type new task here..." />
                </Grid.Row>
                {contract ? <TaskList contract={contract} account={account} /> : null }
            </Grid>
        </Segment>
    );
}

export default TaskComponent;

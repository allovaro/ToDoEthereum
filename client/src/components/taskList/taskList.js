import React, { useState } from 'react';
import {
    Segment, Header, Grid, Button, Checkbox, Input,
} from 'semantic-ui-react';

function TaskList(props) {
    const [inputField, setInputField] = useState('');
    const [list, setList] = useState([]);
    const [lastId, setLastId] = useState(0);
    const { account, contract } = props;

    const inputChanged = (event, { value }) => {
        setInputField(value);
    };

    const CreateTask = async () => {
        await contract.methods.createTask(inputField).send({ from: account });
    };

    const GetTask = async id => {
        const ret = await contract.methods.getTask(id).call();
        return ret;
    };

    const GetLastId = async () => {
        const ret = await contract.methods.getLastTaskId().call();
        const ids = [];
        for (let i = 0; i <= ret; i += 1) {
            ids.push(i);
        }
        return ids;
    };

    const GetTasks = async () => {
        const ids = GetLastId();
        const items = ids.map(async id => (await GetTask(id)));
        setList(items);
    };

    const DeleteTask = async id => {
        await contract.methods.deleteTask(id).send({ from: account });
    };

    const DoneTask = async id => {
        await contract.methods.doneUndoneTask(id).send({ from: account });
    };

    return (
        <Segment secondary raised>
            <Grid divided>
                <Grid.Row verticalAlign="middle">
                    <Header as="h2" color="purple" floated="left">
                        Tasks
                    </Header>
                    <Button primary onClick={CreateTask}>New task</Button>
                    <Button primary onClick={GetTasks}>Get</Button>
                    <Input onChange={inputChanged} />
                </Grid.Row>

                {list
                    ? list.map(item => {
                        const date = new Date(item.time);
                        const dateItem = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
                        ${date.getHours()}
                        :${date.getMinutes()}
                        :${date.getSeconds()}`;
                        return (
                            <Grid.Row columns={3} verticalAlign="middle">
                                <Grid.Column width={1} textAlign="center">
                                    <Checkbox checked={item.done} onChange={props.onToggle} />
                                </Grid.Column>
                                <Grid.Column width={2} verticalAlign="middle">
                                    <p>{dateItem}</p>
                                </Grid.Column>
                                <Grid.Column width={13}>
                                    <p>{item.content}</p>
                                </Grid.Column>
                            </Grid.Row>
                        );
                    }) : <Grid.Row columns={3} verticalAlign="middle" />}
            </Grid>
        </Segment>
    );
}

export default TaskList;

import React, { useState, useEffect } from 'react';
import { Grid, Button, Checkbox } from 'semantic-ui-react';
import sha1 from 'sha1';

function TaskList(props) {
    const [list, setList] = useState([]);

    const { account, contract } = props;

    const GetLastId = async () => {
        const ret = await contract.methods.getLastTaskId().call();
        if (ret === -1) {
            return [];
        }
        const ids = [];
        for (let i = 0; i <= ret; i += 1) {
            ids.push(i);
        }
        return ids;
    };

    const GetTask = async id => {
        const ret = await contract.methods.getTask(id).call();
        return ret;
    };

    const GetTasks = async () => {
        const idArr = await GetLastId();
        if (idArr.length === 0) {
            return;
        }
        const promises = idArr.map(async id => (await GetTask(id)));
        const items = await Promise.all(promises);
        setList(items);
    };

    useEffect(() => {
        contract.events.ListUpdated({}, () => {
            GetTasks();
        });
        GetTasks();
    }, []);

    const DeleteTask = async id => {
        await contract.methods.deleteTask(id).send({ from: account });
    };

    const DoneTask = async id => {
        await contract.methods.doneUndoneTask(id).send({ from: account });
    };

    return (
        <>
            {list
                ? list.map((item, id) => {
                    const date = new Date(item[0] * 1000);
                    const dateItem = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
                        ${date.getHours()}
                        :${date.getMinutes()}
                        :${date.getSeconds()}`;
                    return (
                        <Grid.Row key={sha1(`${item[0]}${item[1]}`)} columns={3} verticalAlign="middle">
                            <Grid.Column width={1} textAlign="center">
                                <Checkbox checked={item[2]} onChange={() => DoneTask(id)} />
                            </Grid.Column>
                            <Grid.Column width={2} textAlign="center" verticalAlign="middle">
                                <p>{dateItem}</p>
                            </Grid.Column>
                            <Grid.Column width={11}>
                                <p>{item[1]}</p>
                            </Grid.Column>
                            <Grid.Column width={2} textAlign="center">
                                <Button color="red" icon="trash" onClick={() => DeleteTask(id)} />
                            </Grid.Column>
                        </Grid.Row>
                    );
                }) : <Grid.Row columns={3} verticalAlign="middle" />}
        </>
    );
}

export default TaskList;

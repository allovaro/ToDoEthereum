import React from 'react';
import {
    Button, Header, Icon, Modal,
} from 'semantic-ui-react';

function NewTaskList(props) {
    const [open, setOpen] = React.useState(false);

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size="small"
            trigger={<Button>Basic Modal</Button>}
        >
            <Header icon>
                <Icon name="archive" />
                Archive Old Messages
            </Header>
            <Modal.Content>
                <p>
                    Create new Task list? Your current list will not be accessable now.
                    Do you want to continue?
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    basic
                    color="red"
                    inverted
                    onClick={() => {
                        setOpen(false);
                    }}
                >
                    <Icon name="remove" /> No
                </Button>
                <Button
                    color="green"
                    inverted
                    onClick={() => {
                        props.setOpen();
                        setOpen(false);
                    }}
                >
                    <Icon name="checkmark" /> Yes
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default NewTaskList;

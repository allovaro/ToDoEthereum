import React from 'react';
import { Message } from 'semantic-ui-react';

function formMessage(header, content, remove, index) {
    return (
        <Message info onDismiss={() => remove(index)} key={index}>
            <Message.Header>{header}</Message.Header>
            <p>{content}</p>
        </Message>
    );
}

function MessageList(props) {
    const { messages } = props;
    if (messages.length === 0) {
        return null;
    }

    return (
        messages.map((message, index) => (formMessage(
            message.header,
            message.content,
            props.onRemove,
            index,
        )))
    );
}

export default MessageList;

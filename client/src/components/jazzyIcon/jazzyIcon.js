import React from 'react';
import useAddressIcon from '../../hooks/useAddressIcon';

// Convert an html node object into a string
function nodeToString(node) {
    let tmpNode = document.createElement('div');
    tmpNode.appendChild(node.cloneNode(true));
    const str = tmpNode.innerHTML;
    tmpNode = null; // prevent memory leaks in IE
    return str;
}

function JazzyIcon(props) {
    const icon = useAddressIcon(props.address, props.size);
    return (<div dangerouslySetInnerHTML={{ __html: nodeToString(icon) }} />);
}

export default JazzyIcon;

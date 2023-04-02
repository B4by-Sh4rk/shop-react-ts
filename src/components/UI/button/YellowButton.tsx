import React from 'react';

const YellowButton = ({...props}) => {
    return (
        <button {...props} className={"yellowBtn"}>
            {props.children}
        </button>
    );
};

export default YellowButton;
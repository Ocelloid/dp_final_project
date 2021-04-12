import React from 'react';
import "./style.scss";

export default function Column(props) {
    return <div className="column">
        {!!props.children && props.children}
    </div>;
}
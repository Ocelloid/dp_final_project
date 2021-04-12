import React from 'react';
import "./style.scss";

export default function Row(props) {
    return <div className="row">
        {!!props.children && props.children}
    </div>;
}
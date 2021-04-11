import React from 'react';
import "./style.scss";

export default class MovieContent extends React.Component {
    constructor(props) {
        super(props);
        console.log(props.match.params.id);
    }

    render() {
        return <h1>Placeholder MovieContent component</h1>;
    }
}
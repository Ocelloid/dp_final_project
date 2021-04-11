import React from 'react';
import "./style.scss";

export default class SearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : ''
        }
    }

    render() {
        let displayTitle = this.state.title ? this.state.title : '';
        if (!displayTitle) displayTitle = new URLSearchParams(window.location.search).get('title');

        return <div>
            <h1>Showing information about {displayTitle}</h1>
        </div>;
    }
}
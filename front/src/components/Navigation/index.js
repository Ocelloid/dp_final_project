import React from 'react';
import "./style.scss";
import {Link} from "react-router-dom";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: props.links ? props.links : []
        };
    }

    render() {
        let {links} = this.state;

        return <div className={"navigation"}>
            {!!links && links.map(link => (
                <div key={link.id} className={"navigation-link"}>
                    <Link to={link.address}>
                        {link.name}
                    </Link>
                </div>
            ))}
        </div>;
    }
}
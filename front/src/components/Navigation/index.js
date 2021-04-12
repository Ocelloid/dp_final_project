import React from 'react';
import "./style.scss";
import {Link} from "react-router-dom";

export default class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            srolled: false,
            links: props.links ? props.links : []
        };
    }

    componentDidMount()  {
        window.addEventListener('scroll', () => this.handleScroll(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',() => this.handleScroll(this), false);
    }

    handleScroll(that) {
        const offset = window.scrollY;
        console.log(offset);
        if (offset > 80) {
            that.setState({...that.state, scrolled: true});
        }
        else{
            that.setState({...that.state, scrolled: false});
        }
    }

    render() {
        let {links, scrolled} = this.state;

        return <div className={"navigation" + (scrolled ? " scrolled" : "")}>
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
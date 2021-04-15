import React from 'react';
import {Link} from "react-router-dom";
import "./style.scss";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search_name: ''
        }
    }

    render() {
        let {search_name} = this.state;

        return <div className={"header"}>
            <Link className={"logo"} to="/"/>
            <div className={"searchbar"}>
                <form action="/search" method="get">
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Search top 1000 movies"
                        name="title"
                        value={search_name}
                        onChange={v => this.setState({search_name: v.target.value})}
                    />
                    <button type="submit" disabled={!search_name}/>
                </form>
            </div>
            <div className={"title"}>
                <h1>Movie theater DB</h1>
            </div>
        </div>;
    }
}
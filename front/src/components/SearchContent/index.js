import React from 'react';
import Loading from "../Utils/Loading";
import "./style.scss";
import {Link} from "react-router-dom";
import axios from 'axios';
import { API_BASE } from "../../consts";

export default class SearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : '',
            loading: false,
            movies_found: []
        }
    }

    componentDidMount() {
        let displayTitle = new URLSearchParams(window.location.search).get('title');
        this.setState({...this.state, title: displayTitle}, async () => {
            await this.fetchMovieContent(displayTitle);
        });
    }

    async fetchMovieContent(displayTitle) {
        try {
            this.setState({...this.state, loading: true});
            const response = await axios.post("https://liczdmjvcg.execute-api.us-east-1.amazonaws.com/default/searchAPI", {movieID: displayTitle});
            this.setState({movies_found: eval(response.data.movie), loading: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, loading: false});
        }
    }

    render() {
        let {loading, movies_found, title} = this.state;
        if (!movies_found) movies_found = [];
        return <div className={"search-wrapper"}>
            <h1>Showing information about {title}</h1>
            {loading ? <Loading/> : <div className={"search-content"}>
                {!!movies_found.length
                    ? <p>Found these entries for your search:</p>
                    : <p>No entries found for your search!</p>
                }
                {!!movies_found.length && <div className={"search-list"}>
                    {movies_found.map(movie => <div className={"search-entry"}>
                        <Link to={"/movie/" + movie[0]}>{movie[2]}</Link>
                    </div>)}
                </div>}
            </div>}
        </div>;
    }
}
import React from 'react';
import Loading from "../Utils/Loading";
import "./style.scss";
import {Link} from "react-router-dom";
import axios from 'axios';
import {MoviesListItem} from "../MoviesList";
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
            this.setState({movies_found: eval(response.data.movie).map(movie => ({
                    id: movie[0],
                    poster_link: movie[1],
                    series_title: movie[2],
                    released_year: movie[3],
                    runtime: movie[5],
                    genre: movie[6],
                    IMDB_Rating: movie[7],
                    description: movie[8],
                    meta_score: movie[9],
                    director: movie[10],
                    stars: [movie[11],movie[12],movie[13],movie[14]],
                    votes: movie[15],
                    gross: movie[16]
                })), loading: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, loading: false});
        }
    }

    render() {
        let {loading, movies_found, title} = this.state;
        console.log(movies_found);
        if (!movies_found) movies_found = [];
        return <div className={"search-wrapper"}>
            <h1>Showing information about {title}</h1>
            {loading ? <Loading/> : <div className={"search-content"}>
                {!!movies_found.length
                    ? <p>Found these entries for your search:</p>
                    : <p>No entries found for your search!</p>
                }
                {!!movies_found.length && <div className={"search-list"}>
                    {movies_found.map(movie => <MoviesListItem movie={movie}/>)}
                </div>}
            </div>}
        </div>;
    }
}
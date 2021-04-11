import React from 'react';
import Loading from "../Loading";
import "./style.scss";
import {Link} from "react-router-dom";
import axios from 'axios';

export default class SearchContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title ? props.title : '',
            isFetching: false,
            movies_found: []
        }
    }

    async componentDidMount() {
        await this.fetchMovieContent();
        // this.timer = setInterval(() => this.fetchMovieContent(), 5000);
    }

    componentWillUnmount() {
        // clearInterval(this.timer);
        // this.timer = null;
    }

    async fetchMovieContent() {
        this.setState({...this.state, isFetching: true});

        // try {
        //     this.setState({...this.state, isFetching: true});
        //     const response = await axios.get("USER_SERVICE_URL");
        //     this.setState({movies_found: response.data, isFetching: false});
        // } catch (e) {
        //     console.log(e);
        //     this.setState({...this.state, isFetching: false});
        // }

        setTimeout(() => {
            this.setState({
                ...this.state,
                movies_found: [
                    {id: 1, title: 'Some movie 1'},
                    {id: 2, title: 'Some movie 2'},
                    {id: 3, title: 'Some movie 3'},
                ],
                isFetching: false
            })
        }, 1000);
    }

    render() {
        let {isFetching, movies_found} = this.state;
        let displayTitle = this.state.title ? this.state.title : '';
        if (!displayTitle) displayTitle = new URLSearchParams(window.location.search).get('title');

        return <div className={"search-wrapper"}>
            <h1>Showing information about {displayTitle}</h1>
            {isFetching ? <Loading/> : <div className={"search-content"}>
                {!!movies_found.length
                    ? <p>Found these entries for your search:</p>
                    : <p>No entries found for your search!</p>
                }
                {!!movies_found.length && <div className={"search-list"}>
                    {movies_found.map(movie => <div className={"search-entry"}>
                        <Link to={"/movie/" + movie.id}>{movie.title}</Link>
                    </div>)}
                </div>}
            </div>}
        </div>;
    }
}
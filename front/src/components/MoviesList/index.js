import React from 'react';
import "./style.scss";
import axios from "axios";
import {API_BASE} from "../../consts";
import Loading from "../Utils/Loading";

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            movies_list: [],
            loading: true,
        }
    }

    async componentDidMount() {
        await this.fetchMovies();
    }

    async fetchMovies() {
        let {page} = this.state;

        try {
            this.setState({...this.state, loading: true});
            const response = await axios.get("https://67lzvlkq8e.execute-api.us-east-1.amazonaws.com/default/pagination/?page=" + page);
            this.setState({movies_list: response.data, loading: false});
        } catch (e) {
            console.log(e);
            this.setState({...this.state, loading: false});
        }
    }

    pageChange(page) {
        this.setState({...this.state, page: page/1}, async () => {
            await this.fetchMovies()
        });
    }

    render() {
        let {page, loading, movies_list} = this.state;
        let options = Array.from(Array(100).keys());

        return <div className={"movies-list"}>
            <div className={"list-wrapper"}>
                {loading
                    ? <Loading/>
                    : movies_list.map(movie => <MoviesListItem movie={{
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
                    }}/>)
                }
            </div>
            <div className={"pagination"}>
                <button className={"prv"} onClick={() => this.pageChange(this.state.page - 1)} disabled={page === 0}>
                    Previous page
                </button>
                <select name={"pages"} id={"pages"} value={page} onChange={event => this.pageChange(event.target.value)}>
                    {options.map((x, i) => <option value={i}>{i+1}</option>)}
                </select>
                <button className={"nxt"} onClick={() => this.pageChange(this.state.page + 1)} disabled={page === 99}>
                    Next page
                </button>
            </div>
        </div>;
    }
}

export class MoviesListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: props.movie
        }
    }

    render() {
        return <div className={"list-item"}>

        </div>
    }
}
import React from 'react';
import "./style.scss";
import axios from "axios";
import Loading from "../Utils/Loading";
import {Link} from "react-router-dom";

export default class MoviesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
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
            const response = await axios.post("https://67lzvlkq8e.execute-api.us-east-1.amazonaws.com/default/pagination", {uplimit: page});
            this.setState({movies_list: eval(response.data.pagination).map(movie => ({
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

    pageChange(page) {
        this.setState({...this.state, page: page/1}, async () => {
            await this.fetchMovies()
        });
    }

    render() {
        let {page, loading, movies_list} = this.state;
        console.log(movies_list);
        let options = Array.from(Array(100).keys());

        return <div className={"movies-list"}>
            <div className={"pagination"}>
                <span>Showing {(page-1)*10 + 1} - {(page)*10} out of 1000 movies ordered by their iMDB rating.</span>
                <button className={"prv"} onClick={() => this.pageChange(this.state.page - 1)} disabled={page === 1}>
                    Previous page
                </button>
                <select name={"pages"} id={"pages"} value={page} onChange={event => this.pageChange(event.target.value)}>
                    {options.map((x, i) => <option value={i+1} key={i+1}>{i+1}</option>)}
                </select>
                <button className={"nxt"} onClick={() => this.pageChange(this.state.page + 1)} disabled={page === 100}>
                    Next page
                </button>
            </div>
            <div className={"list-wrapper"}>
                {loading
                    ? <Loading/>
                    : movies_list.map(movie => <MoviesListItem movie={movie} key={movie.id}/>)
                }
            </div>
            <div className={"pagination"}>
                <button className={"prv"} onClick={() => this.pageChange(this.state.page - 1)} disabled={page === 1}>
                    Previous page
                </button>
                <select name={"pages"} id={"pages"} value={page} onChange={event => this.pageChange(event.target.value)}>
                    {options.map((x, i) => <option value={i+1} key={i+1}>{i+1}</option>)}
                </select>
                <button className={"nxt"} onClick={() => this.pageChange(this.state.page + 1)} disabled={page === 100}>
                    Next page
                </button>
            </div>
        </div>;
    }
}

export class MoviesListItem extends React.Component {
    render() {
        let {movie} = this.props;
        return <Link className={"list-item"} to={"/movie/" + movie.id}>
            <div className={"poster"}>
                <img src={movie.poster_link}/>
            </div>
            <div className={"content"}>
                <span className={"item-title"}>{movie.series_title}</span>
                <span className={"item-desc"}>{movie.description}</span>
            </div>
        </Link>
    }
}
import React from 'react';
import "./style.scss";
import Loading from "../Utils/Loading";
import axios from "axios";
import {API_BASE} from "../../consts";

export default class MovieContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: props.match.params.id,
            movie_content: {
                id: window.location.pathname.split("/").slice(-1).pop(),
                poster_link: '',
                series_title: '',
                released_year: '',
                runtime: '',
                genre: '',
                IMDB_Rating: '',
                description: '',
                meta_score: '',
                director: '',
                stars: ['','','',''],
                votes: '',
                gross: ''
            },
            loading: true
        });
    }

    async componentDidMount() {
        await this.getMovie(this.state.id);
    }

    async getMovie(id) {
        this.setState({...this.state, loading: true});

        try {
            this.setState({...this.state, isFetching: true});
            const response = await axios.post("https://7m0xmfs9v4.execute-api.us-east-1.amazonaws.com/default/movieByID", {id});
            const movie = eval(response.data.movie)[0];
            console.log(movie);
            this.setState({
                movie_content: {
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
                },
                loading: false
            });
        } catch (e) {
            console.log(e);
            this.setState({...this.state, loading: false});
        }
    }

    render() {
        let {loading, movie_content} = this.state;
        return <div className={"movie-content-wrapper"}>
            {loading ? <Loading/> : <div className={"movie-content"}>
                <h1>{movie_content.series_title} ({movie_content.released_year})</h1>
                <div className={"movie-body"}>
                    <div className={"meat"}>
                        <div className={"description"}>
                            <span className={"dsc_title"}>Genre:</span>
                            <span className={"dsc_value"}>{movie_content.genre}</span>
                            <br/>
                            <span className={"dsc_title"}>Director:</span>
                            <span className={"dsc_value"}>{movie_content.director}</span>
                            <br/>
                            <span className={"dsc_title"}>Starring:</span>
                            <span className={"dsc_value"}>{movie_content.stars.join(', ')}</span>
                            <br/>
                            <span className={"dsc_title"}>Description:</span>
                            <span className={"dsc_value"}>{movie_content.description}</span>
                        </div>
                        <div className={"poster"}>
                            <img src={movie_content.poster_link}/>
                        </div>
                    </div>
                    <div className={"potatoes"}>

                    </div>
                </div>
            </div>}
        </div>;
    }
}
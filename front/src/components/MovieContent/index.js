import React from 'react';
import "./style.scss";
import Loading from "../Utils/Loading";
import axios from "axios";
import ChartWrapper from "../Utils/ChartWrapper";
import {Chart} from "react-google-charts";
import Row from "../Utils/Row";

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
            meta_movies_same_year: [],
            imdb_movies_same_year: [],
            gross_movies_same_year: [],
            loading: true,
            chartLoading: true,
        });
    }

    async componentDidMount() {
        await this.getMovie(this.state.id);
    }

    async getMovie(id) {
        try {
            this.setState({...this.state, loading: true});
            const response = await axios.post("https://7m0xmfs9v4.execute-api.us-east-1.amazonaws.com/default/movieByID", {id});
            const movie = eval(response.data.movie)[0];
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

            try {
                this.setState({...this.state, chartLoading: true});
                const year_response = await axios.post("https://5zv5f3owri.execute-api.us-east-1.amazonaws.com/default/years", {year: movie[3]});
                let meta_movies_same_year = eval(year_response.data.body).map(other_movie => [other_movie[2], other_movie[9], movie[9]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
                let imdb_movies_same_year = eval(year_response.data.body).map(other_movie => [other_movie[2], other_movie[7], movie[7]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
                let gross_movies_same_year = eval(year_response.data.body).map(other_movie => [other_movie[2], other_movie[16], movie[16]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
                meta_movies_same_year.unshift(["Title", "Score", "This movie score"]);
                imdb_movies_same_year.unshift(["Title", "Score", "This movie score"]);
                gross_movies_same_year.unshift(["Title", "Gross", "This movie gross"]);
                console.log(gross_movies_same_year)
                this.setState({...this.state, meta_movies_same_year, imdb_movies_same_year, gross_movies_same_year})
            } catch (e) {
                console.log(e);
                this.setState({...this.state, loading: false});
            }
        } catch (e) {
            console.log(e);
            this.setState({...this.state, loading: false});
        }

    }

    render() {
        let {loading, movie_content, imdb_movies_same_year, meta_movies_same_year, gross_movies_same_year} = this.state;
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
                            <br/>
                            <span className={"dsc_title"}>Runtime:</span>
                            <span className={"dsc_value"}>{movie_content.runtime}utes</span>
                            <br/>
                            <span className={"dsc_title"}>Score:</span>
                            <span className={"dsc_value"}>Meta {movie_content.meta_score}, iMDB {movie_content.IMDB_Rating}</span>
                            <br/>
                            <span className={"dsc_title"}>Gross in the USA:</span>
                            <span className={"dsc_value"}>${movie_content.gross} million</span>
                        </div>
                        <div className={"poster"}>
                            <img src={movie_content.poster_link}/>
                        </div>
                    </div>
                    <div className={"potatoes"}>
                        <ChartWrapper>
                            {imdb_movies_same_year.length === 0 ? <Loading/> :
                                <Chart
                                    chartType="ComboChart"
                                    data={imdb_movies_same_year}
                                    options={{
                                        title: 'Score of other movies released in the same year by iMDB',
                                        hAxis: {title: 'iMDB Score', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
                                        seriesType: 'bars',
                                        series: { 1: { type: 'line' } },
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                    legendToggle
                                />
                            }
                            {meta_movies_same_year.length === 0 ? <Loading/> :
                                <Chart
                                    chartType="ComboChart"
                                    data={meta_movies_same_year}
                                    options={{
                                        title: 'Score of other movies released in the same year by Metacritic',
                                        hAxis: {title: 'Metacritic Score', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
                                        seriesType: 'bars',
                                        series: { 1: { type: 'line' } },
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                    legendToggle
                                />
                            }
                            {gross_movies_same_year.length === 0 ? <Loading/> :
                                <Chart
                                    chartType="ComboChart"
                                    data={gross_movies_same_year}
                                    options={{
                                        title: 'Gross of other movies released in the same year',
                                        hAxis: {title: 'Gross ($M)', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
                                        seriesType: 'bars',
                                        series: { 1: { type: 'line' } },
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                    legendToggle
                                />
                            }
                        </ChartWrapper>
                    </div>
                </div>
            </div>}
        </div>;
    }
}
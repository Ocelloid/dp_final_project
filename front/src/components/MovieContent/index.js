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
                // const year_response = await axios.post("https://5zv5f3owri.execute-api.us-east-1.amazonaws.com/default/years", {year: movie[3]});
                const year_response = "[[1, \"https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX67_CR0,0,67,98_AL_.jpg\", \"The Shawshank Redemption\", 1994, \"A\", \"142 min\", \"Drama\", 9, \"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.\", 80, \"Frank Darabont\", \"Tim Robbins\", \"Morgan Freeman\", \"Bob Gunton\", \"William Sadler\", 2343110, 28], [7, \"https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY98_CR0,0,67,98_AL_.jpg\", \"Pulp Fiction\", 1994, \"A\", \"154 min\", \"Crime, Drama\", 9, \"The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.\", 94, \"Quentin Tarantino\", \"John Travolta\", \"Uma Thurman\", \"Samuel L. Jackson\", \"Bruce Willis\", 1826188, 107], [44, \"https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_UX67_CR0,0,67,98_AL_.jpg\", \"The Lion King\", 1994, \"U\", \"88 min\", \"Animation, Adventure, Drama\", 9, \"Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.\", 88, \"Roger Allers\", \"Rob Minkoff\", \"Matthew Broderick\", \"Jeremy Irons\", \"James Earl Jones\", 942045, 422], [167, \"https://m.media-amazon.com/images/M/MV5BZTIwYzRjMGYtZWQ0Ni00NDZhLThhZDYtOGViZGJiZTkwMzk2XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_UY98_CR3,0,67,98_AL_.jpg\", \"Andaz Apna Apna\", 1994, \"U\", \"160 min\", \"Action, Comedy, Romance\", 8, \"Two slackers competing for the affections of an heiress inadvertently become her protectors from an evil criminal.\", 0, \"Rajkumar Santoshi\", \"Aamir Khan\", \"Salman Khan\", \"Raveena Tandon\", \"Karisma Kapoor\", 49300, 0], [262, \"https://m.media-amazon.com/images/M/MV5BMGQ5MzljNzYtMDM1My00NmI0LThlYzQtMTg0ZmQ0MTk1YjkxXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_UY98_CR1,0,67,98_AL_.jpg\", \"Chung Hing sam lam\", 1994, \"U\", \"102 min\", \"Comedy, Crime, Drama\", 8, \"Two melancholy Hong Kong policemen fall in love: one with a mysterious female underworld figure, the other with a beautiful and ethereal server at a late-night restaurant he frequents.\", 77, \"Kar-Wai Wong\", \"Brigitte Lin\", \"Takeshi Kaneshiro\", \"Tony Chiu-Wai Leung\", \"Faye Wong\", 63122, 600], [520, \"https://m.media-amazon.com/images/M/MV5BYTY4MTdjZDMtOTBiMC00MDEwLThhMjUtMjlhMjdlYTBmMzk3XkEyXkFqcGdeQXVyNjMwMjk0MTQ@._V1_UY98_CR1,0,67,98_AL_.jpg\", \"Once Were Warriors\", 1994, \"A\", \"102 min\", \"Crime, Drama\", 8, \"A family descended from Maori warriors is bedeviled by a violent father and the societal problems of being treated as outcasts.\", 77, \"Lee Tamahori\", \"Rena Owen\", \"Temuera Morrison\", \"Mamaengaroa Kerr-Bell\", \"Julian Arahanga\", 31590, 2], [816, \"https://m.media-amazon.com/images/M/MV5BZmVhNWIzOTMtYmVlZC00ZDVmLWIyODEtODEzOTAxYjAwMzVlXkEyXkFqcGdeQXVyMzIwNDY4NDI@._V1_UY98_CR1,0,67,98_AL_.jpg\", \"Il postino\", 1994, \"U\", \"108 min\", \"Biography, Comedy, Drama\", 8, \"A simple Italian postman learns to love poetry while delivering mail to a famous poet, and then uses this to woo local beauty Beatrice.\", 81, \"Michael Radford\", \"Massimo Troisi\", \"Massimo Troisi\", \"Philippe Noiret\", \"Maria Grazia Cucinotta\", 33600, 21], [968, \"https://m.media-amazon.com/images/M/MV5BNTliYTI1YTctMTE0Mi00NDM0LThjZDgtYmY3NGNiODBjZjAwXkEyXkFqcGdeQXVyMTAwMzUyOTc@._V1_UX67_CR0,0,67,98_AL_.jpg\", \"Trois couleurs: Blanc\", 1994, \"U\", \"92 min\", \"Comedy, Drama, Romance\", 8, \"After his wife divorces him, a Polish immigrant plots to get even with her.\", 88, \"Krzysztof Kieslowski\", \"Zbigniew Zamachowski\", \"Julie Delpy\", \"Janusz Gajos\", \"Jerzy Stuhr\", 64390, 1]]";
                let meta_movies_same_year = eval(year_response).map(other_movie => [other_movie[2], other_movie[9], movie[9]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
                let imdb_movies_same_year = eval(year_response).map(other_movie => [other_movie[2], other_movie[7], movie[7]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
                let gross_movies_same_year = eval(year_response).map(other_movie => [other_movie[2], other_movie[16], movie[16]]).filter(om => om[0] !== movie[2]).filter(om => om[1] != 0);
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
                                    chartType="BarChart"
                                    data={imdb_movies_same_year}
                                    options={{
                                        title: 'Score of other movies released in the same year by iMDB',
                                        width: '800px',
                                        hAxis: {title: 'iMDB Score', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                    legendToggle
                                />
                            }
                            {meta_movies_same_year.length === 0 ? <Loading/> :
                                <Chart
                                    chartType="BarChart"
                                    data={meta_movies_same_year}
                                    options={{
                                        title: 'Score of other movies released in the same year by Metacritic',
                                        width: '800px',
                                        hAxis: {title: 'Metacritic Score', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
                                    }}
                                    rootProps={{'data-testid': '1'}}
                                    legendToggle
                                />
                            }
                            {gross_movies_same_year.length === 0 ? <Loading/> :
                                <Chart
                                    chartType="BarChart"
                                    data={gross_movies_same_year}
                                    options={{
                                        title: 'Gross of other movies released in the same year',
                                        width: '800px',
                                        hAxis: {title: 'Gross ($M)', titleTextStyle: {color: '#333'}},
                                        vAxis: {title: 'Movie title'},
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
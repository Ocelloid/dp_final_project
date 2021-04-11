import React from 'react';
import "./style.scss";
import Loading from "../Loading";

export default class MovieContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            id: props.match.params.id,
            movie_content: {
                id: 1,
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

        // try {
        //     this.setState({...this.state, isFetching: true});
        //     const response = await axios.get("USER_SERVICE_URL" + id);
        //     this.setState({movies_found: response.data, isFetching: false});
        // } catch (e) {
        //     console.log(e);
        //     this.setState({...this.state, isFetching: false});
        // }

        setTimeout(() => {
            this.setState({
                ...this.state,
                movie_content: {
                    id: 1,
                    poster_link: 'https://m.media-amazon.com/images/M/MV5BMjAwNDA5NzEwM15BMl5BanBnXkFtZTgwMTA1MDUyNDE@._V1_UX182_CR0,0,182,268_AL_.jpg',
                    series_title: 'What We Do in the Shadows',
                    released_year: '2014',
                    runtime: '86',
                    genre: 'Comedy, Horror',
                    IMDB_Rating: '7.7',
                    description: 'Viago, Deacon and Vladislav are vampires who are finding that modern life has them struggling with the mundane - like paying rent, keeping up with the chore wheel, trying to get into nightclubs and overcoming flatmate conflicts.',
                    meta_score: '76',
                    director: 'Jemaine Clement, Taika Waititi',
                    stars: ["Jemaine Clement", "Taika Waititi", "Cori Gonzalez-Macuer"],
                    votes: '160068',
                    gross: '7253160'
                },
                loading: false
            })
        }, 1000);
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
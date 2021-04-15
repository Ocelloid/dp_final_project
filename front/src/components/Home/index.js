import React from 'react';
import { Chart } from 'react-google-charts';
import "./style.scss";
import ChartWrapper from "../Utils/ChartWrapper";
import Row from "../Utils/Row";
import Loading from "../Utils/Loading";
import axios from "axios";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            yearPercent: [],
            genrePercent: [],
            metaRating: [],
            grossScore: [],
            scoreGrossTitle: [],
            scoreGrossGenre: []
        }
    }

    async componentDidMount() {
        await this.fetchCharts();
    }

    async fetchCharts() {
        try {
            const response = await axios.get("https://91h6x732qg.execute-api.us-east-1.amazonaws.com/default/rating");
            let state = this.state;
            state["metaRating"] = eval(response.data['year&meta']).filter(x => x[0] !== 0);
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
        try {
            const response = await axios.get("https://1uju944v4a.execute-api.us-east-1.amazonaws.com/default/charts");
            let state = this.state;
            state["yearPercent"] = eval(response.data);
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
        try {
            const response = await axios.get("https://9248vjenh7.execute-api.us-east-1.amazonaws.com/default/charts-2");
            let state = this.state;
            state["genrePercent"] = eval(response.data["Genre-Count"]);
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
        try {
            const response = await axios.get("https://9x3hqi0yl9.execute-api.us-east-1.amazonaws.com/default/grossScore");
            let state = this.state;
            state["grossScore"] = eval(response.data["score and gross income"]).filter(x => x[0] !== 0);
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
        try {
            const response = await axios.get("https://exbtrf0vi2.execute-api.us-east-1.amazonaws.com/default/grossGenre");
            let state = this.state;
            state["scoreGrossGenre"] = eval(response.data["genre-avg-count"]).map(x => [x[0].slice(0,3), x[1]/1, x[2]/1, x[0], x[3]]);
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
        try {
            const response = await axios.get("https://429os5ap9f.execute-api.us-east-1.amazonaws.com/default/allmoviesChart");
            let state = this.state;
            state["scoreGrossTitle"] = eval(response.data["title-gross-score"]).map(x => [x[1], x[2]]).filter(x => x[1] !== 0);
            state["scoreGrossTitle"].shift();
            this.setState({state});
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        let {yearPercent, genrePercent, grossScore, metaRating, scoreGrossTitle, scoreGrossGenre} = this.state;

        return <div className={"home"}>
            <h1>Welcome to the XYZ Movie Theater database!</h1>
            <div style={{paddingBottom: 20}}>
                Here you can find the most relevant information about movies to plan re-runs in your local cinema.
            </div>
            <Row>
                <ChartWrapper>
                    {yearPercent.length === 0 ? <Loading/> :
                        <Chart
                            chartType="PieChart"
                            data={[['Year', 'Total of movies'], ...(yearPercent.map(x => [x[0].toString(), x[1]]))]}
                            options={{
                                title: 'Movies released by the year',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    }
                </ChartWrapper>
                <ChartWrapper>
                    {genrePercent.length === 0 ? <Loading/> :
                        <Chart
                            chartType="PieChart"
                            data={[['Genre', 'Total of movies'], ...(genrePercent.map(x => [x[0], x[1]]))]}
                            options={{
                                title: 'Movies released by the genre',
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    }
                </ChartWrapper>
            </Row>
            <Row>
                <ChartWrapper>
                    {grossScore.length === 0 ? <Loading/> :
                        <Chart
                            chartType="ScatterChart"
                            data={[['Score', 'Gross'], ...grossScore]}
                            options={{
                                title: 'Score vs. Gross comparison',
                                hAxis: {title: 'Score'},
                                vAxis: {title: 'Gross'},
                                legend: 'none',
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    }
                </ChartWrapper>
            </Row>
            <Row>
                <ChartWrapper>
                    {scoreGrossTitle.length === 0 ? <Loading/> :
                        <Chart
                            chartType="Scatter"
                            data={[['Gross', 'Score'], ...scoreGrossTitle]}
                            options={{
                                // Material design options
                                chart: {
                                    title: "Movies' Final Gross",
                                    subtitle: 'compared to score',
                                },
                                hAxis: {title: 'Score'},
                                vAxis: {title: 'Gross'},
                            }}
                            rootProps={{'data-testid': '3'}}
                        />
                    }
                </ChartWrapper>
            </Row>
            <Row>
                <ChartWrapper>
                    {metaRating.length === 0 ? <Loading/> :
                        <Chart
                            chartType="LineChart"
                            data={[['Year', 'Metascore'], ...metaRating]}
                            options={{
                                title: 'Average score by year',
                                hAxis: {title: 'Year', titleTextStyle: {color: '#333'}},
                                trendlines: {0: {}},
                                vAxis: {minValue: 0},
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    }
                </ChartWrapper>
                <ChartWrapper>
                    {scoreGrossGenre.length === 0 ? <Loading/> :
                        <Chart
                            chartType="BubbleChart"
                            loader={<div>Loading Chart</div>}
                            data={[['ID', 'Avg. Gross', 'Avg. Score', 'Genre', 'Amount of movies'], ...scoreGrossGenre]}
                            options={{
                                title:
                                    'Correlation between average gross, score ' +
                                    'and amount of movies belonging to different genres',
                                hAxis: {title: 'Avg. Gross'},
                                vAxis: {title: 'Avg. Score'},
                                bubble: {textStyle: {fontSize: 11}},
                            }}
                            rootProps={{'data-testid': '1'}}
                        />
                    }
                </ChartWrapper>
            </Row>
        </div>;
    }
}
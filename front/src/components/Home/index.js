import React from 'react';
import { Chart } from 'react-google-charts';
import "./style.scss";
import ChartWrapper from "../Utils/ChartWrapper";
import Row from "../Utils/Row";

export default class Home extends React.Component {
    render() {
        return <div className={"home"}>
            <h1>Welcome to the XYZ Movie Theater database!</h1>
            <div style={{paddingBottom: 20}}>
                Here you can find the most relevant information about movies to plan re-runs in your local cinema.
            </div>
            <Row>
                <ChartWrapper>
                    <Chart
                        chartType="AreaChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Year', 'Metascore', 'IMDB rating'],
                            ['2013', 76, 89],
                            ['2014', 98, 76],
                            ['2015', 45, 90],
                            ['2016', 90, 54],
                        ]}
                        options={{
                            title: 'Average rating by year',
                            hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
                            vAxis: { minValue: 0 },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <Chart
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Genre', 'Total of movies'],
                            ['Drama', 9],
                            ['Romance', 4],
                            ['Other', 88]
                        ]}
                        options={{
                            title: 'Movies released by the genre',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartWrapper>
            </Row>
            <Row>
                <ChartWrapper>
                    <Chart
                        chartType="ScatterChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Score', 'Gross'],
                            [8, 67],
                            [4, 5.5],
                            [10, 74],
                            [4, 3.2],
                            [3, 2],
                            [6.5, 40],
                        ]}
                        options={{
                            title: 'Score vs. Gross comparison',
                            hAxis: { title: 'Score', minValue: 0, maxValue: 10 },
                            vAxis: { title: 'Gross', minValue: 0, maxValue: 100 },
                            trendlines: { 0: {} },
                            legend: 'none',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <Chart
                        chartType="Scatter"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Investment', 'Gross'],
                            [0, 67],
                            [1, 88],
                            [2, 77],
                            [3, 93],
                            [4, 85],
                            [5, 91],
                            [6, 71],
                            [7, 78],
                            [8, 93],
                            [9, 80],
                            [10, 82],
                            [0, 75],
                            [5, 80],
                            [3, 90],
                            [1, 72],
                            [5, 75],
                            [6, 68],
                            [7, 98],
                            [3, 82],
                            [9, 94],
                            [2, 79],
                            [2, 95],
                            [2, 86],
                            [3, 67],
                            [4, 60],
                            [2, 80],
                            [6, 92],
                            [2, 81],
                            [8, 79],
                            [9, 83],
                            [3, 75],
                            [1, 80],
                            [3, 71],
                            [3, 89],
                            [4, 92],
                            [5, 85],
                            [6, 92],
                            [7, 78],
                            [6, 95],
                            [3, 81],
                            [0, 64],
                            [4, 85],
                            [2, 83],
                            [3, 96],
                            [4, 77],
                            [5, 89],
                            [4, 89],
                            [7, 84],
                            [4, 92],
                            [9, 98],
                        ]}
                        options={{
                            // Material design options
                            chart: {
                                title: "Movies' Final Gross",
                                subtitle: 'based on investment',
                            },
                            hAxis: { title: 'Investment' },
                            vAxis: { title: 'Gross' },
                        }}
                        rootProps={{ 'data-testid': '3' }}
                    />
                </ChartWrapper>
            </Row>
            <Row>
                <ChartWrapper>
                    <Chart
                        chartType="PieChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['Year', 'Total of movies'],
                            ['2014', 3],
                            ['2004', 2],
                            ['Other', 95]
                        ]}
                        options={{
                            title: 'Movies released by the year',
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartWrapper>
                <ChartWrapper>
                    <Chart
                        chartType="BubbleChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['ID', 'Avg. Gross', 'Avg. Investment', 'Genre', 'Amount of movies'],
                            ['HRR', 80.66, 1.67, 'Horror', 33739900],
                            ['SLS', 79.84, 1.36, 'Slasher', 81902307],
                            ['CMD', 78.6, 1.84, 'Comedy', 5523095],
                            ['RMN', 72.73, 2.78, 'Romance', 79716203],
                            ['ADV', 80.05, 2, 'Adventure', 61801570],
                            ['DOC', 72.49, 1.7, 'Documentary', 73137148],
                            ['MOC', 68.09, 4.77, 'Mockumentary', 31090763],
                            ['PAR', 81.55, 2.96, 'Parody', 7485600],
                        ]}
                        options={{
                            title:
                                'Correlation between average gross, investment ' +
                                'and amount of movies belonging to different genres',
                            hAxis: { title: 'Avg. Gross' },
                            vAxis: { title: 'Avg. Investment' },
                            bubble: { textStyle: { fontSize: 11 } },
                        }}
                        rootProps={{ 'data-testid': '1' }}
                    />
                </ChartWrapper>
            </Row>
        </div>;
    }
}
import React from 'react';
import { Chart } from 'react-google-charts';
import "./style.scss";

export default class Home extends React.Component {
    render() {
        return <div className={"home"}>
            <h1>Welcome to the XYZ Movie Theater database!</h1>
            <div style={{paddingBottom: 20}}>
                Here you can find the most relevant information about movies to plan re-runs in your local cinema.
            </div>
            <div style={{ display: 'flex', maxWidth: 900 }}>
                <Chart
                    width={'500px'}
                    height={'300px'}
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
                <Chart
                    width={'500px'}
                    height={'300px'}
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
            </div>
        </div>;
    }
}
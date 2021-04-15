import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/Header';
import Navigation from './components/Navigation';
import SearchContent from './components/SearchContent';
import Content from './components/Content';
import Home from './components/Home';
import About from './components/About';
import MovieContent from './components/MovieContent';
import MoviesList from './components/MoviesList';
import './style.scss';

function App() {

    let links = [
        {id: 0, name: 'Home', address: '/', component: Home},
        {id: 1, name: 'Movies List', address: '/movies', component: Content},
        {id: 10, name: 'About us', address: '/about', component: About},
    ];

    return (
        <div className={"application"}>
            <Router>
                <div className={"mainHeader"}>
                    <Header />
                </div>
                <div className={"mainBody"}>
                    <div className={"leftMenu"}>
                        <Navigation links={links}/>
                    </div>
                    <div className={"content"}>
                        <Route exact={true} path="/" component={Home}/>
                        <Route path="/movies" component={MoviesList}/>
                        <Route path="/movie/:id" component={MovieContent}/>
                        <Route path="/search" component={SearchContent}/>
                        <Route path="/about" component={About}/>
                    </div>
                </div>
            </Router>
        </div>
    );
}

export default App;

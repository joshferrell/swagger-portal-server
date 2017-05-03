import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import Search from './Search';
import { toJson } from './Utils';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apis: [] };
    }

    componentDidMount() {
        fetch('http://localhost:8000/docs')
          .then(toJson)
          .then(apis => this.setState({ apis }))
          .catch(() => this.setState({ message: 'something went wrong' }));
    }

    render() {
        return (<div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <Search apis={this.state.apis} />
        </div>);
    }
}

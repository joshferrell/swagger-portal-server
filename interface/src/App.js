import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import './App.css';
import logo from './logo.svg';
import Search from './Search';
import Document from './Document';
import { toJson, promiseLogger, find, propEq } from './Utils';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apis: [] };
    }

  renderDocument(request) {
      const { id } = request.match.params
      const doc = find( propEq( 'id', id ), this.state.apis )
      if ( doc ) {
        return <Document id={ id } title={ doc.title } />
      }
      else {
        return <h1>Document does not exist <a href="/">Try Another</a></h1>
      }
  }

  componentDidMount() {
    fetch( '/docs' )
      .then( toJson )
      .then( apis => this.setState( { apis } ) )
      .then( promiseLogger )
      .catch( error => this.setState( { message: "something went wrong" } ) )
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <Route exact path="/" render={ () => <Search apis={ this.state.apis } /> } />
          <Route exact path="/:id" render={ this.renderDocument.bind(this) } />
        </div>
      </Router>
    );
  }
}

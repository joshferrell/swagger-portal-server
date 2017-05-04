import React, { Component } from 'react';

export default class Document extends Component {
  render() {
    return (
      <h1>Document { this.props.title }</h1>
    );
  }
}

import React, { Component, PropTypes } from 'react';
import './Search.css';
import { match } from './Utils';

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { text: "", apis: [] }
  }

  changeFilter( e ) {
    this.setState( { text: e.target.value } )
  }

  renderResult( results ) {
    return <ul className="List">{
      results.map( r => <li key={ r.id }><a href={ `/${r.id}` }>{ r.title }</a></li> )
    }</ul>
  }

  renderForm( text ) {
    return <form>
      <label>Filter API</label>
      <input value={ text } onInput={ this.changeFilter.bind( this ) } />
    </form>
  }

  render() {
    const apis = this.props.apis
    const text = this.state.text

    const results = ( text.length > 0 )
      ? apis.filter( x => match( text, x.title ) ) : apis

    return <section>
      { this.renderForm( text ) }
      { this.renderResult( results ) }
    </section>
  }
}

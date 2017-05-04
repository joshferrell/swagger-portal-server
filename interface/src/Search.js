import React, { Component, PropTypes } from 'react';
import './Search.css';
import { match } from './Utils';

export default class Search extends Component {
    static propTypes = {
        apis: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired
            })
        ).isRequired
    };

    constructor(props) {
        super(props);
        this.state = { text: '', apis: [] };

        this.changeFilter = this.changeFilter.bind(this);
    }

    changeFilter = (e) => {
        this.setState({ text: e.target.value });
    }

    renderResult = results =>
        <ul className="List">
            {results.map(({ id, title }) =>
                <li key={id}>{title}</li>)
            }
        </ul>;

    renderForm = text =>
        <form>
            <label>Filter API
                <input
                  value={text}
                  onInput={this.changeFilter}
                />
            </label>
        </form>;

    render() {
        const { apis } = this.props;
        const { text } = this.state;

        const results = (text.length > 0) ?
            apis.filter(api => match(text, api.title)) :
            apis;

        return (
            <section>
                { this.renderForm(text) }
                { this.renderResult(results) }
            </section>
        );
    }
}

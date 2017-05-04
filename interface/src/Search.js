import React, { Component, PropTypes } from 'react';
import './Search.css';
import { checkResults } from './Utils';
import AppCard from './Widgets/AppCard';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', apis: [] };
    }

    changeFilter(e) {
        this.setState({ text: e.target.value });
    }

    renderResult = results =>
        <ul className="d-flex List px-0">
            {results.map(app =>
                <li key={app.id} className="col-md-4 col-sm-6">
                    <AppCard
                      title={app.title}
                      description={app.description}
                      actionLink={{ title: 'View API', url: `/swagger.html?url=${app.filePath}` }}
                    />
                </li>
            )}
        </ul>;

    renderForm(text) {
        return (<form>
            <label>Filter API</label>
            <input value={text} onInput={this.changeFilter.bind(this)} />
        </form>);
    }

    render() {
        const apis = this.props.apis;
        const text = this.state.text;

        const results = (text.length > 0) ?
            checkResults(text, apis) :
            apis;

        return (<section>
            { this.renderForm(text) }
            { this.renderResult(results) }
        </section>);
    }
}

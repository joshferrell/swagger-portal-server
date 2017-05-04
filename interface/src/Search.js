import React, { Component, PropTypes } from 'react';
import './Search.css';
import { match } from './Utils';
import AppCard from './Widgets/AppCard';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = { text: '', apis: [] };
    }

    changeFilter(e) {
        this.setState({ text: e.target.value });
    }


    // createdAt:"2017-05-04T17:10:44.457Z"
    // description:"bar1"
    // filePath:"foobar1"
    // id:"207e15e2-1e7e-4899-b718-b6ed8a71eef6"
    // title:"foo1"
    // updatedAt:"2017-05-04T17:10:44.457Z"

    renderResult = results =>
        <ul className="d-flex List">
            {results.map(app =>
                <li key={app.id} className="col-md-4">
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

        const results = (text.length > 0)
      ? apis.filter(x => match(text, x.title)) : apis;

        return (<section>
            { this.renderForm(text) }
            { this.renderResult(results) }
        </section>);
    }
}

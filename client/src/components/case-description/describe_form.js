import React, { Component } from 'react';
import DescribeFormPage1 from './describe_form_page1';
import DescribeFormPage2 from './describe_form_page2';
import queryString from 'query-string';
import Landing from '../landing';
import './describe.scss';

class DescribeForm extends Component {

    constructor(props) {
        super(props)
        this.nextPage = this.nextPage.bind(this)
        this.previousPage = this.previousPage.bind(this)
        this.state = {
            page: 1         
        }
    }

    handleSubmit = values => {
        // Get case type from query string
        const params = queryString.parse(this.props.location.search);
        const {caseType} = params;

        // Add to values and make full query string for search
        values.caseType = caseType;
        values.mode = 'list';

        const qs = queryString.stringify(values);
        this.props.history.push('/search?' + qs);
    }

    nextPage() {
        this.setState({ page: this.state.page + 1 })
    }

    previousPage() {
        this.setState({ page: this.state.page - 1 })
    }

    goToLanding = () => {
        this.props.history.push('/');
    };

    render() {
        const { page } = this.state;

        return (
            <div className="container describe-form">
                {page === 1 && <DescribeFormPage1 onSubmit={this.nextPage} goToLanding={this.goToLanding}/>}
                {page === 2 && <DescribeFormPage2 previousPage={this.previousPage} onSubmit={this.handleSubmit} />}
            </div>
        )
    }
}

export default DescribeForm;
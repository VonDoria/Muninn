import React, { Component, Fragment } from 'react';
import '../styles/Search.css';

export default class Search extends Component 
{

    constructor()
    {
        super();

        this.stateInicial = { header: 'https://www.google.com/search?q=', query: ''};
        this.state = this.stateInicial;
    }

    getQuery = element => {
        this.setState({
            query: element.target.value
        });
    }

    clearQuery = () => {
        setTimeout(() => {
            this.setState(this.stateInicial);
            document.querySelector('.searchArea input').value = '';
        }, 1000);
    }

    click = event => {
        if(event.key === "Enter")
        {
            window.location.href = this.state.header + this.state.query;
            document.querySelector('.searchArea input').value = '';
        }
    }
    
    render()
    {
        return (
            <Fragment>
                <div className="searchArea" onKeyUp={this.click}>
                    <input onChange={this.getQuery} />
                    <a href={this.state.header + this.state.query} target="_blank" rel="noopener noreferrer" onClick={this.clearQuery}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-search"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    </a>
                </div>
            </Fragment>
        );
    }
}
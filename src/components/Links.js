import React, { Component, Fragment } from 'react';
import '../styles/Links.css';
import FormLink from './FormLink';
import LinkContent from './LinkContent';

export default class Links extends Component 
{
    constructor()
    {
        super();
        this.opened = false;
        this.state = {
            links: {},
        }
    }

    checkList()
    {
        if(localStorage.getItem("linkList") === null || localStorage.getItem("linkList") === '')
        {
            console.log("Lista de links não encontrada");
            localStorage.setItem("linkList", '{ "Main": [] }');
            if(localStorage.getItem("linkList") != null) 
            {
                console.log("Lista de links criada");
                let linkList = localStorage.getItem("linkList");
                linkList = JSON.parse(linkList);
                console.log(linkList);
                this.setState({
                    links: linkList
                });
            }
        }
        else{
            let linkList = localStorage.getItem("linkList");
            if(localStorage.getItem("linkList") !== "" && localStorage.getItem("linkList") != null)
            {
                linkList = JSON.parse(linkList);
                this.setState({
                    links: linkList
                });
            }
        }
    }

    componentDidMount()
    {
        this.checkList();
    }

    open = () => {
        if(this.opened)
        {
            this.opened = false;
            document.querySelector('.svgContainer').style.transform = 'rotateZ(0deg)';
            // document.querySelector('.linksContainer').style.left = '-20vw';
            document.querySelector('.linksContainer').classList.toggle("linksContainerOpened");
        }else{
            this.opened = true;
            document.querySelector('.svgContainer').style.transform = 'rotateZ(180deg)';
            // document.querySelector('.linksContainer').style.left = '0vw';
            document.querySelector('.linksContainer').classList.toggle("linksContainerOpened");
        }
    }

    openForm = () => {
        document.querySelector('.formLink').style.left = '0';
        this.checkList()
    }

    reload = () => {
        this.checkList()
    }

    render()
    {
        return (
            <Fragment>
                <div className="linksContainer">
                    <div className="ear" onClick={this.open}>
                        <div className="svgContainer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevrons-right"><polyline points="13 17 18 12 13 7"/><polyline points="6 17 11 12 6 7"/></svg>
                        </div>
                    </div>
                    <FormLink className="formLink" selectList={this.state.links} reRender={this.reload}></FormLink>
                    <LinkContent className="LinkContent" reRender={this.reload} openForm={this.openForm} selectList={this.state.links} ></LinkContent>
                </div>
            </Fragment>
        );
    }
}
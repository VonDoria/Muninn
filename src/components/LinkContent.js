import React, { useState, useEffect, Fragment } from 'react';
import '../styles/LinkContent.css'

export default function LinkContent(props)
{
    // ref={elem => bin = elem}
    // const bin = React.createRef();

    let linkData = localStorage.getItem("linkList");
    linkData = JSON.parse(linkData);

    const [showMenu, setShowMenu] = useState('Main');
    const [renderList, setRenderList] = useState([]);
    const [linkList, setLinkList] = useState(linkData);  //eslint-disable-line

    // -----------------------------------------------------------------------------------------------------------------

    const populateSelect = list => {
        return (list.map((item, index) => {
            return (<div id={item} key={index} title="tab" draggable="true" onClick={() => setShowMenu(item)} >{item}</div>);
        }));
    }

    const click = event => {
        if(event.key === "Enter")
        {
            let copy = localStorage.getItem("linkList");
            copy = JSON.parse(copy);
            copy[event.target.value.trim()] = [];
            copy = JSON.stringify(copy);
            localStorage.setItem("linkList", copy);
            event.target.value = '';
            let linkData = localStorage.getItem("linkList");
            setLinkList(JSON.parse(linkData));
        }
    }

    const createElements = () => {
        if(!!linkList){
            let link = linkList[showMenu].map((element, index) => {
                return (<a id={element.name} title="link" target="_blank" rel="noopener noreferrer" draggable="true" key={index} href={element.link} style={element.style}>{element.name}</a>)
            });
            setRenderList(link);
        }
    }

    function delay(tmp)
    {
        setTimeout(() => {}, tmp);
    }

    function addGlobalEventListener()
    {
        window.addEventListener("dragstart", event => {
            event.dataTransfer.setData("Text", event.target.id);
        });
        document.querySelector('#deleteArea').addEventListener("dragenter", event => {
            event.target.style.boxShadow = "0px 0px 60px 20px var(--red)";  
        });
        document.querySelector('#deleteArea').addEventListener("dragover", event => event.preventDefault());
        document.querySelector('#deleteArea').addEventListener("dragleave", event => {
            event.target.style.boxShadow = "0px 0px 10px #555";
        });
        document.querySelector('#deleteArea').addEventListener("drop", event => {
            event.target.style.boxShadow = "0px 0px 10px #555";
            let linkList = localStorage.getItem("linkList");
            linkList = JSON.parse(linkList);
            let data = event.dataTransfer.getData("Text");
            let element = document.querySelector(`#${data}`);
            delay(500);
            if(element.title === 'link')
            {
                linkList[showMenu].map( (object, index) => {
                    if(object.name === data) 
                    {
                        linkList[showMenu].splice(index, 1);                      
                        element.style.display = "none";
                    }
                    return '';
                });
            }else{
                if(data !== "Main" && element.title === 'tab')
                {
                    delete linkList[data];
                    document.querySelector(`#${data}`).style.display = "none";
                }
            }
            let copy = JSON.stringify(linkList);
            localStorage.setItem("linkList", copy);
            setLinkList(linkList);
            return;
        });
    }

    useEffect(() => {
        createElements();
        let linkData = localStorage.getItem("linkList");
        setLinkList(JSON.parse(linkData));
    }, [props.selectList]);  //eslint-disable-line
    
    useEffect(() => {
        document.querySelector('#currentLink').innerHTML = showMenu;
        addGlobalEventListener();
        createElements();
    }, [showMenu]);  //eslint-disable-line

    useEffect(() => {
        createElements();
    }, []);  //eslint-disable-line

    
    return (
        <Fragment>
            <div className="linkContent">
                <div className="content">
                    {renderList}
                </div>
                <div className="buttons">
                    <div className="deleteLink">
                        <div id="deleteArea"></div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </div>
                    <div>
                        <div className="select">
                            <span id="currentLink">{showMenu}</span>
                            {populateSelect(Object.keys(linkList | {}))}
                            <input placeholder="New Page" onKeyUp={click} />
                        </div>
                    </div>
                    <div className="crateLink" onClick={props.openForm}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="70%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

import React, { useState , Fragment } from 'react';
import '../styles/FormLink.css'
import { program } from '@babel/types';

export default function FormLink(props)
{
    const [menu, setMenu] = useState('Main');
    const [name, setName] = useState('');
    const [link, setLink] = useState('#');
    const [style, setStyle] = useState({color: '#000', background: '#fff', borderColor: '#000', borderWidth: '1px'});


    const attElement = () => {
        let elementView = document.querySelector('.preview');
        let link = document.querySelector('.link').value;
        let title = document.querySelector('.title').value;
        let color = document.querySelector('#color').value;
        let background = document.querySelector('#background').value;
        let borderColor = document.querySelector('#borderColor').value;
        let border = document.querySelector('#border').value;

        setName(title);
        setLink(link);
        setStyle({color: color, background: background, borderColor: borderColor, borderWidth: border + 'px',}); 

        elementView.innerHTML = title;
        elementView.style.color = color;
        elementView.style.background = background;
        elementView.style.borderColor = borderColor;
        elementView.style.borderWidth = border + 'px';
    }

    const closeForm = event => {
        event.target.parentElement.style.left = "-100%";
        props.reRender();
    }

    const setPage = str => {
        setMenu(str);
        document.querySelector('#currentForm').innerHTML = str;
    }

    const populateSelect = list => {
        return (list.map((item, index) => {
            return (<div key={index} onClick={() => setPage(item)} >{item}</div>);
        }));
    }

    const click = event => {
        if(event.key === "Enter")
        {
            let copy = props.selectList;
            copy[event.target.value] = [];
            copy = JSON.stringify(copy);
            localStorage.setItem("linkList", copy);
            event.target.value = '';
            props.reRender();
        }
    }

    const submmit = () => {

        if(name !== "" && link !== "")
        {
            let copy = props.selectList;
            let element = {name: name, link: link, style: style};

            copy[menu].push(element);
            copy = JSON.stringify(copy);
            localStorage.setItem("linkList", copy);
            document.querySelector('.link').value = '';
            document.querySelector('.title').value = '';
            props.reRender();
        }
    }

    return (
        <Fragment>
            <div className="formLink">
                <div className="closeForm" onClick={closeForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </div>
                <div className="top">
                <div>
                    <div className="select">
                        <span id="currentForm">{menu}</span>
                        {populateSelect(Object.keys(props.selectList))}
                        <input placeholder="New Page" onKeyUp={click} />
                    </div>
                </div>
                    <div className="preview"></div>
                </div>
                <input type="text" className="title" placeholder="Name" onChange={attElement} ></input>
                <input type="text" className="link" placeholder="Link" onChange={attElement} ></input>
                <div>
                    <label for="color">Font-Color</label>
                    <input id="color" type="color" className="color" onChange={attElement} />
                </div>
                <div>
                    <label for="background">Background-Color</label>
                    <input id="background" type="color" className="background" onChange={attElement} />
                </div>
                <div>
                    <label for="borderColor">Border-Color</label>
                    <input id="borderColor" type="color" className="borderColor" onChange={attElement} />
                </div>
                <div>
                    <label for="border">Border-Width</label>
                    <input id="border" type="range" min="0" max="10" className="border" onChange={attElement} />
                </div>
                <div className="button" onClick={submmit}>Create</div>
            </div>
        </Fragment>
    );
}

import React, { Fragment, useEffect, useState } from 'react';
import '../styles/Notes.css'
import Masonry from 'react-masonry-css'

export default function Notes(props)
{
    const [notes, setNotes] = useState([]);
    const [itens, setItens] = useState([]);
    const [flag, setFlag] = useState(true);

    function updateNotes()
    {
        if(localStorage.getItem("noteList") == null)
        {
            console.log("Lista de notas não encontrada");
            localStorage.setItem("noteList", "[]");
            if(localStorage.getItem("noteList") != null) 
            {
                console.log("Lista de notas criada");
                let noteList = localStorage.getItem("noteList");
                setNotes(JSON.parse(noteList));
                console.log(notes);
            }
        }
        else{
            let noteList = localStorage.getItem("noteList");
            if(localStorage.getItem("noteList") !== "" && localStorage.getItem("noteList") != null)
            {
                setNotes(JSON.parse(noteList));
            }
        }
    }

    function createNote()
    {
        let text = document.getElementsByTagName('textarea')[0].value;
        document.getElementsByTagName('textarea')[0].value = "";
        let newNote = { color: '#fefefe', note: text };
        setNotes(notes.push(newNote));
        let storageList = JSON.stringify(notes);
        localStorage.setItem("noteList", storageList);
        updateNotes();
    }

    function changeColor(index)
    {
        console.log(index);
        var value = document.querySelector(`#color_${index}`).value;
        if(value !== "#000000")
        {
            setNotes(notes[index].color = value);
            let storageList = JSON.stringify(notes);
            localStorage.setItem("noteList", storageList);
        }
    }

    function copyNote(index)
    {
        var element = document.querySelector(`[key=note_${index}]`);

        let node = element.target.parentElement.parentElement.parentElement.querySelector('.text').innerText;
        const el = document.createElement('textarea');
        el.value = node;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    function deleteNote(index)
    {
        setNotes(notes.splice(index, 1));
        let storageList = JSON.stringify(notes);
        localStorage.setItem("noteList", storageList);
        updateNotes();
    }

    function open()
    {
        var element = document.querySelector("div[class=title]");
        if(flag)
        {
            element.parentElement.classList.toggle("hideOpen");
            setFlag(false);
        }else{
            element.parentElement.classList.toggle("hideOpen");
            setFlag(true);
        }
    }

    useEffect(() => {
        updateNotes();
    }, []);  //eslint-disable-line

    useEffect(() => {
        let itenList = notes.map((note, index) => {
            return(
            <div key={`note_${index}`} className="noteContainer" style={{background: note.color}} >
                <div className="tools">
                    <input className="colors" type="color" id={`color_${index}`} onMouseLeave={() => changeColor(index)}></input>
                    <div className="copy" onClick={() => copyNote(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </div>
                    <div className="delete" onClick={() => deleteNote(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </div>
                </div>
                <div className="text">{note.note}</div>
            </div>
            );
        });
        itenList.push(
            <div className="newNote">
                <div className="plus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <div className="form">
                    <textarea maxLength="200"></textarea>
                    <div onClick={() => createNote()} className="button">Create</div>
                </div>
            </div>);
        setItens(itenList);
    }, [notes]); //eslint-disable-line

    return (
        <Fragment>
            <div className="notesContainer">
                <div className="hide">
                    <div className="title" onClick={open} >Notes</div>
                    <div className="content" id="content">
                        <Masonry breakpointCols={{default: 4, 1100: 3, 700: 2, 500: 1}} className="my-masonry-grid">
                            {itens}
                        </Masonry>
                    </div>
                </div>                    
            </div>
        </Fragment>
    );
}
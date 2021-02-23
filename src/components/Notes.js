import React, { Component, Fragment } from 'react';
import '../styles/Notes.css'

export default class Notes extends Component 
{
    constructor()
    {
        super();

        this.notes = [];
        this.state = { elements: [] };
        this.flag = { update: true, open: true};
    }

    updateNotes()
    {
        if(localStorage.getItem("noteList") == null)
        {
            console.log("Lista de notas não encontrada");
            localStorage.setItem("noteList", "[]");
            if(localStorage.getItem("noteList") != null) 
            {
                console.log("Lista de notas criada");
                let noteList = localStorage.getItem("noteList");
                this.notes = JSON.parse(noteList);
                console.log(this.notes);
            }
        }
        else{
            let noteList = localStorage.getItem("noteList");
            if(localStorage.getItem("noteList") !== "" && localStorage.getItem("noteList") != null)
            {
                this.notes = JSON.parse(noteList);
            }
        }

        let itens = this.notes.map((note, index) => {
            return(
            <div key={index} className="noteContainer" style={{background: note.color}} >
                <div className="tools">
                    <input className="colors" type="color" id={index} onMouseLeave={this.changeColor}></input>
                    <div className="copy" onClick={this.copyNote}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </div>
                    <div className="delete" onClick={this.deleteNote}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="50%" height="50%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </div>
                </div>
                <div className="text">{note.note}</div>
            </div>
            );
        });

        this.setState({ elements: itens });
    }

    createNote = () => {
        let text = document.getElementsByTagName('textarea')[0].value;
        document.getElementsByTagName('textarea')[0].value = "";
        let newNote = { color: '#fefefe', note: text };
        this.notes.push(newNote);
        let storageList = JSON.stringify(this.notes);
        localStorage.setItem("noteList", storageList);
        this.updateNotes();
    }

    changeColor = (element) => {

        if(element.target.value !== "#000000")
        {
            element.target.parentElement.parentElement.style.background = element.target.value;
            this.notes[element.target.id].color = element.target.value;
            let storageList = JSON.stringify(this.notes);
            localStorage.setItem("noteList", storageList);
        }
    }

    copyNote = (element) => {
        let node = element.target.parentElement.parentElement.parentElement.querySelector('.text').innerText;
        const el = document.createElement('textarea');
        el.value = node;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    deleteNote = (element) => {
        let index = element.target.parentElement.parentElement.querySelector('input').id;
        this.notes.splice(index, 1);
        let storageList = JSON.stringify(this.notes);
        localStorage.setItem("noteList", storageList);
        element.target.parentElement.parentElement.parentElement.style.transform = "scale(0)";
        setTimeout(() => {
            element.target.parentElement.parentElement.parentElement.style.display = "none";
            this.updateNotes();
        }, 500);
    }

    open = (element) => {
        if(this.flag.open)
        {
            element.target.parentElement.classList.toggle("hideOpen");
            this.flag.open = false;
        }else{
            element.target.parentElement.classList.toggle("hideOpen");
            this.flag.open = true;
        }
    }

    render()
    {
        if(this.flag.update)
        {
            this.updateNotes();
        }
        this.flag.update = false;
        return (
            <Fragment>
                <div className="notesContainer">
                    <div className="hide">
                        <div className="title" onClick={this.open} >Notes</div>
                        <div className="content" id="content">
                            {this.state.elements}
                            <div className="newNote">
                                <div className="plus">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="5vh" height="5vh" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                </div>
                                <div className="form">
                                    <textarea maxlength="200"></textarea>
                                    <div onClick={this.createNote} className="button">Create</div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </Fragment>
        );
    }
}
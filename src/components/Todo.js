import React, { Fragment } from 'react';
import '../styles/Todo.css';

export default function Todo() 
{
    const closeTodo = () => {
        document.querySelector('.todoContant').classList.toggle('todoClose');
    }

    return (
        <Fragment>
            <div className="todoContainer" onClick={closeTodo}>doit</div>
            <iframe src="https://doit-eight.vercel.app/" title="doit" className="todoContant todoClose"></iframe>
        </Fragment>
    );
}
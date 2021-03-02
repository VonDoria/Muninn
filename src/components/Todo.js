import React, { Fragment, useEffect, useState } from 'react';
import '../styles/Todo.css';

export default function Todo() 
{
    const [todo, setTodo] = useState({ "Today": [] });
    const [currentMenu, setCurrentMenu] = useState("Today");
    const [currentList, setCurrentList] = useState([]);
    const [menuList, setMenuList] = useState([]);

    function checkList()
    {
        if(localStorage.getItem("todoList") === null)
        {
            console.log("Lista de todo não encontrada");
            localStorage.setItem("todoList", '{ "Today": [] }');
            if(localStorage.getItem("todoList") !== null) 
            {
                console.log("Lista de todo criada");
                let todoList = localStorage.getItem("todoList");
                todoList = JSON.parse(todoList);
                console.log(todoList);
                setTodo(todoList);
            }
        }
        else{
            let todoList = localStorage.getItem("todoList");
            if(todoList !== "" && todoList != null)
            {
                todoList = JSON.parse(todoList);
                setTodo(todoList);
            }
        }

    }

    function mount() 
    {
        var listMenu = Object.keys(todo).map((element, index) => {
            if(element === "Today")
            {
                return <div key={index} onClick={() => setCurrentMenu(element)}>{element}</div>
            }else{
                return <div key={index} id={element} onClick={() => setCurrentMenu(element)}>{element}<button onClick={deleteTodo}><img src="/close.svg" alt="Delete Todo" /></button></div>
            }
        });
        setMenuList(listMenu);
        console.log(todo);
        var listTodo = todo[currentMenu].map((element, index) => {
            return (
                <div key={index} className="Task">
                    <input type="checkbox" id={`todo${index}`} checked={element.checked} onChange={changeStatus} />
                    <label htmlFor={`todo${index}`} >{element.text}</label>
                    <button onClick={deleteTodo}><img src="/close.svg" alt="Delete Todo" /></button>
                </div>
            );
        });
        setCurrentList(listTodo);
    }

    const deleteTodo = (event) => {
        if(event.target.parentElement.className === "Task")
        {
            var copy = todo[currentMenu].splice(event.target.parentElement.key, 1);
            setTodo(copy);
            localStorage.setItem("todoList", JSON.stringify(todo));
            mount();
        }else{
            var todoCopy = todo;
            delete todoCopy[event.target.parentElement.id];
            setTodo(todoCopy);
            localStorage.setItem("todoList", JSON.stringify(todo));
            mount();
        }
        console.log(todo);
    }

    const changeStatus = (event) => {
        event.target.checked = !event.target.checked;
    }

    const closeTodo = () => {
        document.querySelector('.todoContant').classList.toggle('todoClose');
    }

    const create = (event) => {
        if(event.key === "Enter" && event.target.value !== '')    
        {
            if(event.target.parentElement.className === "todoContant")
            {
                setTodo(todo[currentMenu].push({
                    text: event.target.value,
                    checked: false
                }));
                localStorage.setItem("todoList", JSON.stringify(todo));
                event.target.value = '';
                mount();
            }else{
                var copy = todo[event.target.value.replace(/ /g, "_")] = [];
                setTodo(copy);
                localStorage.setItem("todoList", JSON.stringify(todo));
                event.target.value = '';
                mount();
            }
        }
    }

    useEffect(() => {
        mount();
    }, [currentMenu]); //eslint-disable-line

    useEffect(() => {
        checkList();
        setTimeout(() => mount(), 1000);
    }, []); //eslint-disable-line

    return (
        <Fragment>
            <div className="todoContainer" onClick={closeTodo}>Todo</div>
            <div className="todoContant">
                <div className="selectContainer">
                    <div className="select">
                        <span>{currentMenu}</span>
                        {menuList}
                        <input placeholder="New Page" onKeyUp={create} />
                    </div>
                </div>
                <div>{currentList}</div>
                <input type="text" onKeyUp={create} placeholder="New Todo" ></input>
            </div>
        </Fragment>
    );
}
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
        if(localStorage.getItem("todoEnuns") === null)
        {
            console.log("Lista de todo não encontrada");
            localStorage.setItem("todoEnuns", '{ "Today": [] }');
            if(localStorage.getItem("todoEnuns") !== null) 
            {
                console.log("Lista de todo criada");
                let todoList = localStorage.getItem("todoEnuns");
                todoList = JSON.parse(todoList);
                console.log(todoList);
                setTodo(todoList);
            }
        }
        else{
            let todoList = localStorage.getItem("todoEnuns");
            if(todoList !== "" && todoList != null)
            {
                todoList = JSON.parse(todoList);
                setTodo(todoList);
            }
        }
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
        let todoList = localStorage.getItem("todoList");
        todoList = JSON.parse(todoList);

        var listMenu = Object.keys(todoList).map((element, index) => {
            if(element === "Today")
            {
                return <div key={index} onClick={() => setCurrentMenu(element)}>{element}</div>
            }else{
                return <div key={index} id={element} onClick={() => setCurrentMenu(element)}>{element}<button onClick={() => deleteTodo(element)}><img src="/close.svg" alt="Delete Todo" /></button></div>
            }
        });
        setMenuList(listMenu);
        var listTodo = todoList[currentMenu].map((element, index) => {
            return (
                <div key={index} id={`todo${index}`} className="Task">
                    <input type="checkbox" id={`checkTodo${index}`} checked={element.checked} onChange={changeStatus} />
                    <label htmlFor={`todo${index}`} >{element.text}</label>
                    <div onClick={() => deleteTodo(`todo${index}`)}><img src="/close.svg" alt="Delete Todo" /></div>
                </div>
            );
        });
        setCurrentList(listTodo);
    }

    function deleteTodo(id)
    {
        let todoList = localStorage.getItem("todoList");
        todoList = JSON.parse(todoList);
        debugger;
        var element = document.querySelector(`#${id}`);
        if(element.className === "Task")
        {
            var copy = todoList[currentMenu].splice(element.key, 1);
            setTodo(copy);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            // mount();
        }else{
            var todoCopy = todoList;
            delete todoCopy[id];
            setTodo(todoCopy);
            localStorage.setItem("todoList", JSON.stringify(todoList));
            // mount();
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
        let todoList = localStorage.getItem("todoList");
        todoList = JSON.parse(todoList);

        if(event.key === "Enter" && event.target.value !== '')    
        {
            if(event.target.parentElement.className === "todoContant")
            {
                setTodo(todoList[currentMenu].push({
                    text: event.target.value,
                    checked: false
                }));
                localStorage.setItem("todoList", JSON.stringify(todoList));
                event.target.value = '';
                // mount();
            }else{
                var copy = todoList[event.target.value.replace(/ /g, "_")] = [];
                setTodo(copy);
                localStorage.setItem("todoList", JSON.stringify(todoList));
                event.target.value = '';
                // mount();
            }
        }
    }

    useEffect(() => {
        mount();
    }, [currentMenu, todo]); //eslint-disable-line

    useEffect(() => {
        checkList();
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
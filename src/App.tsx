import React, { useEffect } from 'react'
import './App.css';
import Task from './components/Task';
import { useState } from 'react';
import uuid from 'react-uuid';
// react uuid - Universal Unique Identifier
// Oliwier Bomba Pąsko

const Lista: { name: string, description: string, done: boolean, date: string, id: string }[] = [];

export default function App() {

    // now - date
    // newTask - input value
    // newDes - input description
    // list - list of tasks
    
    const now = new Date();
    const [newTask, setNewTask] = useState("");
    const [newDes, setNewDes] = useState("");
    const [list, setList] = useState(Lista);   

    // function that adds a new task
    const AddTask = () => {
        if(newTask !== ''){

            const newList = list.concat( { name: newTask, description: newDes, done: false, date: now.toLocaleDateString(), id: uuid() } );
    
            localStorage.setItem("TaskList", JSON.stringify( newList ));

            setNewTask('');
            setNewDes('');
            setList(newList);
        }
    }

    // if saved tasks in localstorage exists
   const ReadLocalStorage = () => {
        if( localStorage.getItem("TaskList") !== null ){
            setList( JSON.parse(localStorage.getItem("TaskList") || '') );
        };
   }

    useEffect(() => {
        ReadLocalStorage();
    },[])

    return (
        <>
            <div className="main-container" >

                <div className="newtask-div">
                    <input type="text" className='input' placeholder='New Task' value={newTask} onChange={e => setNewTask(e.target.value)} />
                    <textarea className='input opis' placeholder='Description' value={newDes} onChange={d => setNewDes(d.target.value)} />
                    <button className='btn-add-task' onClick={() => AddTask()} >Add New Task</button>
                </div>

                <div className="filter-div">
                    <button >All</button>
                    <button >Done</button>
                    <button >ToDo</button>
                </div>

                <div className="tasks-div">
                    <ul>
                        
                        { list.map( (local) => <Task key={local.id} value={local} />)}
                       
                    </ul>
                </div>
            </div>
        </>
    )
}

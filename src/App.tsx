import React, { useEffect } from 'react'
import './App.css';
import Task from './components/Task';
import { useState } from 'react';
import uuid from 'react-uuid';
import moment from 'moment';
// react uuid - Universal Unique Identifier ( long char )
// Oliwier Bomba Pąsko

const Lista: { name: string, description: string, done: boolean, date_start: string, date_end: string, id: string }[] = [];

export default function App() {

    // newTask - input value
    // newDes - input description
    // dateStart - today date
    // dateEnd - input date end
    // list - list of tasks, from localstorage

    const [newTask, setNewTask] = useState("");
    const [newDes, setNewDes] = useState("");
    const dateStart = moment().format('YYYY-MM-D');
    const [dateEnd, setDateEnd] = useState("");
    const [list, setList] = useState(Lista);   

    // function that adds a new task
    const AddTask = () => {
        if(newTask !== '' && dateEnd !== ''){
            // adding two arrays into one - newList
            const newList = list.concat( { 
                name: newTask, 
                description: newDes, 
                done: false, 
                date_start: dateStart, 
                date_end: dateEnd, 
                id: uuid() 
            } );
    
            // set new localstorage
            localStorage.setItem("TaskList", JSON.stringify( newList ));

            // clear inputs and set useState list
            setNewTask('');
            setNewDes('');
            setDateEnd('');
            setList(newList);
        }
    }
    
    //
    const AllFilter = () => {
        
    }
    
    //
    const DoneFilter = () => {
        
    }

    //
    const ToDoFilter = () => {
        
    }


    // check if saved tasks in localstorage exists
   const ReadLocalStorage = () => {
        if( localStorage.getItem("TaskList") !== null ){
            setList( JSON.parse(localStorage.getItem("TaskList") || '') );
        };
   }

   // call the function 
    useEffect(() => {
        ReadLocalStorage();
    },[])

    return (
        <>
            <div className="main-container" >

                <div className="newtask-div">
                    <input type="text" className='input' placeholder='New Task' value={newTask} onChange={e => setNewTask(e.target.value)} />
                    <textarea className='input opis' placeholder='Description' value={newDes} onChange={d => setNewDes(d.target.value)} />
                    <input type="date" min={dateStart} value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}/>
                    <button className='btn-add-task' onClick={() => AddTask()} >Add New Task</button>
                </div>

                <div className="filter-div">
                    <button onClick={() => AllFilter()} >All</button>
                    <button onClick={() => DoneFilter()}>Done</button>
                    <button onClick={() => ToDoFilter()}>ToDo</button>
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

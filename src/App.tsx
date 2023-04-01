import React, { useEffect } from 'react'
import './App.css';
import Task from './components/Task';
import { useState } from 'react';
import uuid from 'react-uuid';
import moment from 'moment';
import { ChakraProvider } from '@chakra-ui/react';
import { Button, Input, Textarea } from '@chakra-ui/react';

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
    
    // sort tasks list and localstorage from 'date' newest task
    const NewestDateFilter = () => {
        const sortedList = list.sort( (t1, t2) => (t1.date_end < t2.date_end) ? 1 : (t1.date_end > t2.date_end) ? -1 : 0 );

        localStorage.setItem("TaskList", JSON.stringify( sortedList ));
        window.location.reload();
    }

    // sort tasks list and localstorage from 'date' oldest task
    const OldestDateFilter = () => {
        const sortedList = list.sort( (t1, t2) => (t1.date_end < t2.date_end) ? -1 : (t1.date_end > t2.date_end) ? 1 : 0 );

        localStorage.setItem("TaskList", JSON.stringify( sortedList ));
        window.location.reload();
    }

    // sort tasks list and localstorage according to name 'title'
    const NameFilter = () => {
        const sortedList = list.sort(
            (t1, t2) => (t1.name < t2.name) ? -1 : (t1.name > t2.name) ? 1 : 0);

        localStorage.setItem("TaskList", JSON.stringify( sortedList ));
        window.location.reload();
    }

    // sort tasks list and localstorage only done tasks and according to newest 'date' 
    const DoneFilter = () => {
        const sortedList = list.sort(
            (t1, t2) => (t1.date_end < t2.date_end && t1.done === true) ? 1 : (t1.date_end > t2.date_end) ? -1 : 0);

        localStorage.setItem("TaskList", JSON.stringify( sortedList ));
        window.location.reload();
    }

    // sort tasks list and localstorage only todo tasks and according to newest 'date' 
    const ToDoFilter = () => {
        const sortedList = list.sort(
            (t1, t2) => (t1.date_end < t2.date_end) ? 1 : (t1.date_end > t2.date_end) ? -1 : 0);

        console.log("Products sorted based on descending order of their prices are:")
        console.log(sortedList);
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
            <ChakraProvider>
                <div className="main-container" >
                    <div className="newtask-div">
                        <input type="text" className='input' placeholder='New Task' value={newTask} onChange={e => setNewTask(e.target.value)} />
                        <textarea className='input opis' placeholder='Description' value={newDes} onChange={d => setNewDes(d.target.value)} />
                        <input type="date" min={dateStart} value={dateEnd} onChange={(e) => setDateEnd(e.target.value)}/>

                        <Button className='btn-add-task' onClick={() => AddTask()} >
                            Add New Task
                        </Button>
                    </div>

                    <div className="filter-div">
                        <Button onClick={() => NewestDateFilter()} >
                            Newest
                        </Button>

                        <Button onClick={() => OldestDateFilter()} >
                            Oldest
                        </Button>

                        <Button onClick={() => NameFilter()} >
                            Name
                        </Button>

                        <Button onClick={() => DoneFilter()}>
                            Done
                        </Button>
                        
                        <Button onClick={() => ToDoFilter()}>
                            ToDo
                        </Button>
                    </div>

                    <div className="tasks-div">
                        <ul>
                        
                            { list.map( (task) => <Task key={task.id} value={task} />)}
                        
                        </ul>
                    </div>
                </div>
            </ChakraProvider>
        </>
    )
}

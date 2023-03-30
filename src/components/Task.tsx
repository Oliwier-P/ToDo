import React, { useEffect } from 'react'
import { useState } from 'react'
import { tasksList } from '../Types';

interface TaskProps {
    value: tasksList;
}

export default function Task({value}: TaskProps) {

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");

    // Delete task from localstorage
    const RemoveClick = () => {

        // storedData = localstorage
        const storedData = JSON.parse(localStorage.getItem("TaskList") || "");

        // find object with the same id to remove
        const indexToRemove = storedData.findIndex( (obj: any) => obj.id == value.id );

        // remove object from temporary list
        storedData.splice(indexToRemove, 1);

        // set new localstorage data without the object
        localStorage.setItem("TaskList", JSON.stringify(storedData));

        // refresh site
        window.location.reload();
    }

    // if description is too long, and make it beauty
    useEffect(() => {
        setDescription(() => value.description.length >= 30 ? value.description.substring(0, 30) + "..." : value.description); 
        setName(() => value.name.length >= 25 ? value.name.substring(0, 25) + "..." : value.name); 
    },[]);
    return (
        <>
           <div className='task'>
            <span>{name}</span>
            <span>{description}</span>
            <span>{value.date_start} to {value.date_end}</span>
            
            <span>{value.done}</span>
            <button>Edit</button>
            <button onClick={() => RemoveClick()} >Del</button>
           </div>
        </>
    )
}

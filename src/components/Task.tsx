import React from 'react'

interface TaskProps {
    value: {
        name: string, 
        description: string, 
        done: boolean;
        date: string,
        id: string
    };
}

export default function Task({value}: TaskProps) {

    // Delete task from localstorage
    const handleClick = () => {
        const storedData = JSON.parse(localStorage.getItem("TaskList") || "");
        const indexToRemove = value.id;
        storedData.splice(indexToRemove, 1);

       localStorage.setItem("TaskList", JSON.stringify(storedData));
        /*
            1 - get local and parse
            2 - splice data
            3 - stringify
            4 - back to local
        */
    }

    return (
        <>
           <div className='task'>
            <span>{value.name}</span>
            <span>{value.description}</span>
            <span>{value.date}</span>
            
            <span>{value.done}</span>
            <button>Edit</button>
            <button onClick={() => handleClick()} >Del</button>
           </div>
        </>
    )
}

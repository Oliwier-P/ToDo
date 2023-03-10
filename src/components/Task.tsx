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
    return (
        <>
           <div className='task'>
            <span>{value.name}</span>
            <span>{value.description}</span>
            <span>{value.date}</span>
            
            <span>{value.done}</span>
            <button>Edit</button>
            <button>Del</button>
           </div>
        </>
    )
}

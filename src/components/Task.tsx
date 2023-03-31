import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { tasksList } from '../Types';
import { ChakraProvider, Checkbox, Button, useDisclosure } from '@chakra-ui/react';
import { FaTrashAlt } from 'react-icons/all';
import { AiFillEdit } from 'react-icons/all';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
  } from '@chakra-ui/react'

interface TaskProps {
    value: tasksList;
}

export default function Task({value}: TaskProps) {

    const [description, setDescription] = useState("");
    const [name, setName] = useState("");

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

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

    //
    const EditClick = () => {

    }

    //
    const CheckFunction = () => {
        
        // not working

        // const storedData = JSON.parse(localStorage.getItem("TaskList") || "");

        // const objIndex = storedData.findIndex(( (obj: any) => obj.id == 1));

        // console.log("Before update: ", storedData[objIndex])

        // storedData[objIndex].done = !storedData[objIndex].done

        // console.log("After update: ", storedData[objIndex])

    }

    // if description is too long, and make it beauty
    useEffect(() => {
        setDescription(() => value.description.length >= 30 ? value.description.substring(0, 30) + "..." : value.description); 
        setName(() => value.name.length >= 25 ? value.name.substring(0, 25) + "..." : value.name);  
    },[]);
    return (
        <>
            <ChakraProvider>
                <div className='task'>
                    <span>{name}</span>
                    <span>{description}</span>
                    <span>{value.date_start} to {value.date_end}</span>
                    
                    <span>{value.done}</span>
                    <Checkbox colorScheme='blue' border='black' size='md' onChange={() => CheckFunction()}></Checkbox>
                    <Button size='xs'  leftIcon={<AiFillEdit />} colorScheme='green' variant='solid' onClick={() => EditClick()} ></Button>
                    <Button size='xs' leftIcon={<FaTrashAlt />} colorScheme='red' variant='solid' onClick={() => (onOpen(), RemoveClick())} ></Button>
                </div>

                {/* Alert Dialog */}
            </ChakraProvider>
        </>
    )
}

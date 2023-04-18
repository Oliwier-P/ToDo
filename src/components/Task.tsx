import React, { useEffect } from 'react'
import { useState, useRef } from 'react'
import { tasksList } from '../Types';
import { ChakraProvider, Checkbox, Button, useDisclosure, Input, Textarea } from '@chakra-ui/react';
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

    // states to make description and name shorter
    const [shortDescription, setShortDescription] = useState("");
    const [shortName, setShortName] = useState("");

    // states to edit task
    const [editName, setEditName] = useState(value.name);
    const [editDescription, setEditDescription] = useState(value.description);
    const [editDate, setEditDate] = useState(value.date_end);

    // states to open and close edit and delete dialog
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const cancelRef = useRef(null);

    // state to check if task is done
    const [box, setBox] = useState<boolean>(value.done);

    const TaskFunction = (type: string) => {
        
        // storedData = localstorage
        const storedData = JSON.parse(localStorage.getItem("TaskList") || "");

        // find object with id = value.id
        const objIndex = storedData.findIndex( (obj: any) => obj.id == value.id );

        switch(type){
            case "delete":
                // remove object from temporary list
                storedData.splice(objIndex, 1);
                break;
            case "edit":
                // change object data
                storedData[objIndex].name = editName;
                storedData[objIndex].description = editDescription;
                storedData[objIndex].date_end = editDate;
                break;
            case "check":
                // change object data
                storedData[objIndex].done = !box;
                break;
            default:
                break;
        }

        // set new localstorage data without the object
        localStorage.setItem("TaskList", JSON.stringify(storedData));

        // refresh site
        window.location.reload();
    }

    // if name & description is too long, and make it beauty
    // set box state to value.done, to set Checkbox isChecked ( always equal value.done ) 
    useEffect(() => {
        setShortDescription(() => value.description.length >= 30 ? value.description.substring(0, 30) + "..." : value.description); 
        setShortName(() => value.name.length >= 25 ? value.name.substring(0, 25) + "..." : value.name);  
        setBox(value.done);
    },[]);
    return (
        <>
            <ChakraProvider>
                <div className='task'>
                    <span>{shortName}</span>
                    <span>{shortDescription}</span>
                    <span>{value.date_start}</span>
                    <span>to</span>
                    <span>{value.date_end}</span>
                    <span>{value.done}</span>
                    <Checkbox 
                        colorScheme='blue' 
                        border='black' 
                        size='md' 
                        isChecked={box}
                        onChange={() => TaskFunction("check")}
                    >  
                    </Checkbox>
                    <Button 
                        size='xs'  
                        leftIcon={<AiFillEdit />} 
                        colorScheme='green' 
                        variant='solid' 
                        onClick={onEditOpen} 
                    >
                    </Button>
                    <Button 
                        size='xs' 
                        leftIcon={<FaTrashAlt />} 
                        colorScheme='red' 
                        variant='solid' 
                        onClick={onDeleteOpen}
                    >
                    </Button>
                </div>

                <AlertDialog 
                    isOpen={isEditOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onEditClose}
                    isCentered
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Edit Task
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                    Name:
                                    <Input type="text" value={editName} onChange={(n) => setEditName(n.target.value)} />
                                    Description:
                                    <Textarea value={editDescription} onChange={(d) => setEditDescription(d.target.value)} />
                                    End date:
                                    <Input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
                            </AlertDialogBody>        

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onEditClose}>
                                    Cancel    
                                </Button>
                                <Button colorScheme="green" onClick={() => (TaskFunction("edit"), onEditClose)} ml={3}>
                                    Edit   
                                </Button>    
                            </AlertDialogFooter>               
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

                <AlertDialog 
                    isOpen={isDeleteOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onDeleteClose}
                    isCentered
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Delete Task?
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Are you sure? You can't undo this action afterwards.
                            </AlertDialogBody>        

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onDeleteClose}>
                                    Cancel    
                                </Button>
                                <Button colorScheme="red" onClick={() => (TaskFunction("delete"), onDeleteClose)} ml={3}>
                                    Delete
                                </Button>    
                            </AlertDialogFooter>               
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

            </ChakraProvider>
        </>
    )
}

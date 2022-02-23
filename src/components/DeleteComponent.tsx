import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box } from "@chakra-ui/layout"
import { Image, Text, useDisclosure } from '@chakra-ui/react'
import React, {useContext} from "react"
import { GlobalCtx } from "../App"
import { useParams, useNavigate } from "react-router"



const DeleteComponent = () => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {token, url} = gState
    const navigate = useNavigate()
    
    const handleDelete = () => {
        fetch(`${url}pins/${pinID}`,{
            method: "delete",
            headers: {
                "Authorization" : `Bearer ${token}`
            }
        })
        .then((res)=>{
            navigate("/")
        })
    }
    return (
        <>
        <Box>
        <Button onClick={()=>{onOpen()}}>Delete</Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader fontSize="2em" color="red">Delete Pin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Are you sure you want to delete?</Text>
                <Button 
                    ml="80%" 
                    mb="20px"
                    bgGradient='linear(to-r, red, darkred)'  
                    color="white"
                    _hover={{
                        bgGradient:'linear(to-r, red, darkred)',
                        transform: "scale(1.1)"  
                    }}
                    onClick={()=>{handleDelete()}}
                >Delete</Button>
            </ModalBody>
            </ModalContent>
        </Modal>
        </Box>
        </>
    )
}

export default DeleteComponent
import { Box } from "@chakra-ui/layout"
import { Image, Text, useDisclosure } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'


  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router"
import { GlobalCtx } from "../App"
import { useNavigate } from "react-router"

const DeleteCollection = ({collectionId, title, description}:any) => {
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_pfp, username, id, token, url} = gState
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const handleDelete = async () => {
        const response = await fetch(`${url}collections/${collectionId}`, {
            method:"delete"
        })
        const data = await response.json()
        navigate("/")
    }

    return (
        <>
            <Button onClick={onOpen} w="100px">Delete</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader fontSize="2em" color="red">Delete Collection</ModalHeader>
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
        </>
    )
}

export default DeleteCollection
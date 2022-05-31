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

import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box } from "@chakra-ui/layout"
import { Image, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from "react"
import { GlobalCtx } from "../App"
import { useParams, useNavigate } from "react-router"



const EditComponent = ({formState, setFormState, getPin}:any) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_pfp, username, id, token, url} = gState
    const navigate = useNavigate()
    
    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        const newForm = {...formState}
        newForm[event.currentTarget.name] = event.currentTarget.value
        setFormState(newForm)
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        const {title, description, image} = formState
        await fetch(`${url}pins/${pinID}`, {
            method:"put",
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({title, description, image})
        })
        .then(async (response) => {
            onClose()
            console.log(await response.json())
            getPin()
        })
    }
    return (
        <>
        <Box>
        <Button onClick={()=>{onOpen()}}>Edit</Button>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader fontSize="2em" color="brand.100">Edit Pin</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <form onSubmit={handleSubmit}>
                    <FormControl mb='20px'>
                        <FormLabel htmlFor='title'>Title</FormLabel>
                        <Input id='title' type='text' name="title" value={formState.title} onChange={handleChange}/>
                        <FormHelperText>Come up with an interesting title for your pin.</FormHelperText>
                    </FormControl>

                    <FormControl mb='20px'>
                        <FormLabel htmlFor='title'>Description</FormLabel>
                        <Input id='title' type='text' name="description" value={formState.description} onChange={handleChange}/>
                        <FormHelperText>Write whatever you want to describe your pin.</FormHelperText>
                    </FormControl>

                    <FormControl mb='20px'>
                        <FormLabel htmlFor='title'>Image</FormLabel>
                        <Input id='title' type='text' name="image" value={formState.image} onChange={handleChange}/>
                        <FormHelperText>Paste an image url for your pin's image.</FormHelperText>
                    </FormControl>

                    <FormControl ml="80%" mb="20px">
                            <Button 
                                type="submit" 
                                bgGradient='linear(to-r, brand.100, brand.200)'  
                                color="white"
                                _hover={{
                                    bgGradient:'linear(to-r, brand.100, brand.200)',
                                    transform: "scale(1.1)"  
                                }}
                            >Update</Button>
                    </FormControl>
                </form>
            </ModalBody>
            </ModalContent>
        </Modal>
        </Box>
        </>
    )
}

export default EditComponent
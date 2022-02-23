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

const EditCollection = ({collectionId, title, description}:any) => {
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_pfp, username, id, token, url} = gState
    const { isOpen, onOpen, onClose } = useDisclosure()
    const navigate = useNavigate()

    const [editForm, setEditForm] = useState<any>({
        user_id:id,
        title: title,
        description: description,
        user_username: username
    })

    const handleChange = (event:React.FormEvent<HTMLInputElement>) =>{
        const newForm = {...editForm}
        newForm[event.currentTarget.name] = event.currentTarget.value
         setEditForm(newForm)
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        await fetch(`${url}collections/${collectionId}`, {
            method:"put",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editForm)
        })
        .then(async (res)=>{
            const data = await res.json()
            onClose()
            navigate("/")
        })
    }

    return (
        <>
            <Button onClick={onOpen}>Edit</Button>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Collection</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <form onSubmit={handleSubmit}>
                        <FormControl mb="20px">
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input id='title' type='textarea' name="title" value={editForm.title} onChange={handleChange}/>
                            <FormHelperText>Come up with an interesting title for your collection.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description'>Description</FormLabel>
                            <Input id='description' type='textarea' name="description" value={editForm.description} onChange={handleChange}/>
                            <FormHelperText>Write whatever you want to describe your collection.</FormHelperText>
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
                            >Submit</Button>
                        </FormControl>
                    </form>
                </ModalBody>
            </ModalContent>
            </Modal>
        </>
    )
}

export default EditCollection
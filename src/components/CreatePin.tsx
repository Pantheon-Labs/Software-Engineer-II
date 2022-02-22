import { Box } from "@chakra-ui/layout"
import React, { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalCtx } from "../App"
import { useMediaQuery } from "@chakra-ui/media-query"
import { Button, Text, useDisclosure, Textarea } from '@chakra-ui/react'
import {FaPlus} from "react-icons/fa"
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

const CreatePin = ({getPins}:any) => {

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()

    const {gState} = useContext(GlobalCtx)
    const {token, username, id, url, pfp} = gState
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [createForm, setCreateForm] = useState<any>({
        title: "",
        description: "",
        image: "",
        user_id: 0,
        user_username: "",
        user_pfp: ""
    })

    const [hashtags, setHashtags] = useState<any>({
        tag1: "",
        tag2: "",
        tag3: "",
        tag4: ""
    })

    useEffect(()=> {
        setCreateForm({
            ...createForm,
            title: "",
            description: "",
            image: "",
            user_id: id,
            user_username: username,
            user_pfp: pfp
        })
    }, [token])

    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        const newForm = {...createForm}
        newForm[event.currentTarget.name] = event.currentTarget.value
        setCreateForm(newForm)
    }

    const handleTagChange = (event:React.FormEvent<HTMLInputElement>) => {
        const newForm = {...hashtags}
        newForm[event.currentTarget.name] = event.currentTarget.value
        setHashtags(newForm)
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        const {title, description, image, user_id, user_username, user_pfp} = createForm
        await fetch(`${url}pins`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({title, description, image, user_id, user_username, user_pfp})
        })
        .then(async (res)=>{
            const data = await res.json()
            const pin_id = data.id
            for (const tag in hashtags) {
                if (hashtags[tag] !== "") {
                    fetch(`${url}hashtags`, {
                        method:"post",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + token
                        },
                        body: JSON.stringify({tag:hashtags[tag], pin_id})
                    })
                    .then((res)=>{
                        setHashtags({
                            tag1: "",
                            tag2: "",
                            tag3: "",
                            tag4: ""
                        })
                    })
                }
            }

        })
        .then((data)=> {
            setCreateForm({
                title: "",
                description: "",
                image: "",
                user_id: 0,
                user_username: "",
                user_pfp: ""
            })
            getPins()
            onClose()
        })
    }

    return(
        <>
        <Button leftIcon={<FaPlus/>} 
            size="lg" 
            borderRadius="100px" 
            bgGradient='linear(to-r, brand.100, brand.200)' 
            color="white" ml={isLargerThan600 ? '5%' : '10%'} 
            mt={5} 
            transition=".3s all" 
            onClick={()=>{
                if (token) {
                    onOpen()
                } else {
                    navigate("/signup")
                }
                }}
            _hover={{
                transform:"scale(1.1)"
                }}
        >
            <Text>Create Pin</Text>
        </Button>


        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="2em" color="brand.100">Create Pin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <form onSubmit={handleSubmit}>
                        <FormControl mb='20px'>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input id='title' type='text' name="title" value={createForm.title} onChange={handleChange}/>
                            <FormHelperText>Come up with an interesting title for your pin.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description' >Description</FormLabel>
                            <Input id='description' type='textarea' name="description" value={createForm.description} onChange={handleChange}/>
                            <FormHelperText>Write whatever you want to describe your pin.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description'>Image</FormLabel>
                            <Input id='image' type='text' placeholder="Image URL" name="image" value={createForm.image} onChange={handleChange}/>
                            <FormHelperText>Paste an image url for your pin's image.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor="hashtags">Tags</FormLabel>
                            <Box d="flex">
                                <Input type="text" placeholder="#" name="tag1" value={hashtags.tag1} onChange={handleTagChange}/>
                                <Input type="text" placeholder="#" name="tag2" value={hashtags.tag2} onChange={handleTagChange}/>
                                <Input type="text" placeholder="#" name="tag3" value={hashtags.tag3} onChange={handleTagChange}/>
                                <Input type="text" placeholder="#" name="tag4" value={hashtags.tag4} onChange={handleTagChange}/>
                            </Box>
                            <FormHelperText>Help people find your pins by adding tags.</FormHelperText>
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

export default CreatePin
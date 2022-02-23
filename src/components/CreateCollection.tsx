import { Button } from "@chakra-ui/button"
import { Box } from "@chakra-ui/layout"
import { FaPlus } from "react-icons/fa"
import { Text, useDisclosure } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/media-query"
import { useNavigate, Link } from "react-router-dom"
import React, { useContext, useState, useEffect } from "react"
import { GlobalCtx } from "../App"
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


const CreateCollection = () => {

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {gState} = useContext(GlobalCtx)
    const {token, username, id, url, pfp} = gState
    const navigate = useNavigate()

    const [collections, setCollections] = useState<any>(null)

    const getCollections = async () => {
        const response = await fetch(`${url}collections/user/${id}`)
        const data = await response.json()
        setCollections(data)
    }

    useEffect(()=>{
        getCollections()
    }, [token])

    const [createForm, setCreateForm] = useState<any>({
        title: "",
        description: "",
        user_id: 0,
        user_username: "",
    })

    useEffect(()=>{
        setCreateForm({...createForm, user_id:id, user_username:username})
    }, [])

    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        const newForm = {...createForm}
        newForm[event.currentTarget.name] = event.currentTarget.value
        setCreateForm(newForm)
    }   

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        await fetch(`${url}collections`, {
            method:"post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(createForm)
        })
        .then(async (res)=> {
            getCollections()
            setCollections({
                title: "",
                description: "",
                user_id: 0,
                user_username: "",
            })
            onClose()
        })
    }
    const collectionBackgroundColors = ['linear(to-r, #2193b0, #6dd5ed)', 'linear(to-r, #2980B9, #6DD5FA)', 'linear(to-r, #7F7FD5, #86A8E7, #91EAE4)', 'linear(to-r, #00B4DB, #0083B0)', 'linear(to-r, #74ebd5, #ACB6E5)',  ]

    const mapCollections = () => {
        return collections.map((single:any) => {
            return <Link to={`/collection/${single.id}`}>
            <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            w={isLargerThan600 ? "80px" : "100px" }
            h={isLargerThan600 ? "80px" : "100px" }
            bgGradient={collectionBackgroundColors[Math.floor(Math.random() * collectionBackgroundColors.length)]}
            mr="20px"
            borderRadius="10px"
            transition=".1s all"
            _hover={{
                transform:"scale(1.1)"
            }}>
                <Text textAlign="center" color="white" fontSize="80%">{single.title}</Text>
            </Box>
            </Link>
        })
    }


    return (
    <>
        <Box bg="whitesmoke" w="100%" h={isLargerThan600 ? "200px" : "300px" } d="flex" justifyContent="center" flexDirection="column">   
            <Box ml="10%" w="80%">
                
                {username ? <Text 
                    fontSize={isLargerThan600 ? '2.5em' : '4em'} 
                    bgGradient='linear(to-l, brand.100, brand.200)'
                    bgClip="text"
                    mt={-8}
                >Welcome, {username}!</Text> : null}

                <Text 
                    fontSize={isLargerThan600 ? "2xl" : "2xl" }
                >Your Collections</Text>

                <Box 
                    w="100%" 
                    d="flex" 
                    alignItems="center" 
                >
                        <Button 
                        w={isLargerThan600 ? "80px" : "100px" }
                        h={isLargerThan600 ? "80px" : "100px" }
                        bgGradient='linear(to-r, brand.100, brand.200)' 
                        color="white"
                        transform=".1s all"
                        mr="20px"
                        _hover={{
                            bgGradient:'linear(to-r, brand.100, brand.200)',
                            transform:"scale(1.1)"
                        }}
                        onClick={()=>{
                                onOpen()
                        }}
                        ><FaPlus /></Button>

                {collections ? mapCollections() : null}

                </Box>
                
            </Box>
        </Box>


        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="2em" color="brand.100">Create Collection</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

                    <form onSubmit={handleSubmit}>
                        <FormControl mb='20px'>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input id='title' type='text' name="title" value={createForm.title} onChange={handleChange}/>
                            <FormHelperText>Come up with an interesting title for your collection.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description'>Description</FormLabel>
                            <Input id='description' type='textarea' name="description" value={createForm.description} onChange={handleChange}/>
                            <FormHelperText>Write whatever you want to describe your pin.</FormHelperText>
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

export default CreateCollection
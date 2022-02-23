import React, { useState, useContext, useEffect } from "react"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { Button } from "@chakra-ui/button"
import { useDisclosure, Text, Box } from "@chakra-ui/react"
import { GlobalCtx } from "../App"
import { useNavigate } from "react-router"

const AddToCollection = ({user_id, original_post_id}:any) => {

    const {gState} = useContext(GlobalCtx)
    const {url, id, token} = gState
    const navigate = useNavigate()
    const [collections, setCollections] = useState<any>(null)
    const collectionBackgroundColors = ['linear(to-r, #2193b0, #6dd5ed)', 'linear(to-r, #2980B9, #6DD5FA)', 'linear(to-r, #7F7FD5, #86A8E7, #91EAE4)', 'linear(to-r, #00B4DB, #0083B0)', 'linear(to-r, #74ebd5, #ACB6E5)']


    const getCollections = async () => {
        const response = await fetch(`${url}collections/user/${id}`)
        const data = await response.json()
        setCollections(data)
    }

    const addToCollection = async (collection_id:any) => {
        const obj = {
            user_id: user_id,
            original_post_id: original_post_id,
            collection_id: collection_id
        }
        await fetch(`${url}savedpins/`, {
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        .then(async (res)=>{
            const data = await res.json()
            console.log(data)
            onClose()
            navigate(`/collection/${collection_id}`)
        })
    }

    const mapCollections = () => {
        return collections.map((collection:any)=>{
            return <Box
                d="flex"
                justifyContent="center"
                alignItems="center"
                w="100px" 
                h="100px" 
                bgGradient={collectionBackgroundColors[Math.floor(Math.random() * collectionBackgroundColors.length)]}
                mr="20px"
                borderRadius="10px"
                transition=".1s all"
                onClick={()=>{addToCollection(collection.id)}}
                _hover={{
                    transform:"scale(1.1)",
                    cursor:"pointer"
                }}>
                <Text textAlign="center" color="white" fontSize="80%">{collection.title}</Text>
            </Box>
        })
    }

    useEffect(()=>{
        getCollections()
    }, [])

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
        <Button onClick={onOpen} bgGradient='linear(to-l, brand.100, brand.200)' color="white">Add to Collection</Button>

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>

                {collections ? mapCollections() : null}

            </ModalBody>
            <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>


        </>
    )

}

export default AddToCollection
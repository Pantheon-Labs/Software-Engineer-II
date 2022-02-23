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
import EditComponent from "../components/EditComponent"
import DeleteComponent from "../components/DeleteComponent"


const ShowPin = () => {
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_pfp, username, id, token, url} = gState

    const [pin, setPin] = useState<any>(null)
    const [formState, setFormState] = useState<any>({
        title: "",
        description: "",
        image: "",
        user_id: 0,
        user_username: "",
        user_pfp: ""
    })

    const getPin = async () => {
        const response = await (fetch(`${url}pins/${pinID}`))
        const data = await response.json()
        setPin(data[0])
        setFormState(data[0])
    }

    useEffect(()=>{
        getPin()
    }, [])
    

    return (
        <>
        {pin ? 
        
        <Box>
            <Text>{pin.title}</Text>
            <Text>{pin.description}</Text>
            <Text>{pin.user_username}</Text>
            <Image src={pin.user_pfp} boxSize="100px"/>
            <Image src={pin.image} w="20%"/>
        </Box> 
        : <h1>Loading...</h1>}

        <Box>
            {id && pin && id === pin.user_id ? <Box>
            <EditComponent formState={formState} setFormState={setFormState} getPin={getPin}/>
            <DeleteComponent />
            </Box>: null}
        </Box>

        </>
    )
}

export default ShowPin
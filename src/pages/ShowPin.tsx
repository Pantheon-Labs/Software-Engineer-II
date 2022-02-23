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
import AddToCollection from "../components/AddToCollection"

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
        <Box border="2px solid transparent" h="100vh" >
        {pin ? 
        <Box  w="50%" m="auto" minWidth="800px">
            
            <Box d="flex" justifyContent="space-between" alignItems="center" bg="white" m="auto" mt={20} borderRadius="20px" boxShadow="10px 10px 10px lightgray">
                
                <Box w="50%">
                    <Image src={pin.image} borderRadius="20px 0 0 20px" w="100%"/>
                </Box>
                
                <Box w="50%" h="500px" d="flex" flexDir="column" alignItems="flex-start">
                    
                    <Box d="flex" justifyContent="center" flexDir="column" ml={5} mb="20px">
                        <Text fontSize="3em" fontWeight="600">{pin.title}</Text>
                        <Text color="gray">{pin.description}</Text>
                    </Box>
                    
                    <Box d="flex" alignItems="center" width="100px" justifyContent="space-between" ml={5}>
                        <Image src={pin.user_pfp} boxSize="50px" borderRadius="100px"/>
                        <Text ml={1}>{pin.user_username}</Text>
                    </Box>

                    <Box mt="10%" w="100%" d="flex" justifyContent="center">
                        {token ? <AddToCollection user_id={pin.user_id} original_post_id={pin.id}/> : null}
                    </Box>

                    
                    {id && pin && id === pin.user_id ? <Box mt="60%" d="flex" w="100%" justifyContent="flex-end" pr={5}>
                        <EditComponent formState={formState} setFormState={setFormState} getPin={getPin}/>
                        <DeleteComponent />
                    </Box>: null}
                
                </Box>
                
            </Box>
        </Box> 
        : <h1>Loading...</h1>}

        <Box>
   
        </Box>

        </Box>
    )
}

export default ShowPin
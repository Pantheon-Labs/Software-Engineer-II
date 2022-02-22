import { Box } from "@chakra-ui/layout"
import { Image, Text } from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router"
import { GlobalCtx } from "../App"


const ShowPin = () => {
    const pinID = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_id, user_pfp, username, id, token, url} = gState

    const [pin, setPin] = useState<any>(null)

    const getPin = async () => {
        const response = await (fetch(`${url}pins/${pinID}`))
        const data = await response.json()
        setPin(data[0])
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


        </>
    )
}

export default ShowPin
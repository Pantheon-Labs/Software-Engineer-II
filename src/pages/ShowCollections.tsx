import { Box } from "@chakra-ui/layout"
import { Image, Text } from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router"
import { GlobalCtx } from "../App"

const ShowCollection = () => {

    const collectionId = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {user_id, user_pfp, username, id, token, url} = gState

    const [collection, setCollection] = useState<any>(null)


    const getCollection = async () => {
        const response = await fetch(`${url}collections/${collectionId}`)
        const data = await response.json()
        setCollection(data)
    }

    useEffect(()=> {
        getCollection()
    }, [])

    return (



        <>

        {collection ? 
        
        <Box>
        <Text>{collection.title}</Text>
        <Text>{collection.description}</Text>
        <Text>{collection.user_username}</Text>
    </Box> 
    
        : null}


        </>
    )
}  

export default ShowCollection
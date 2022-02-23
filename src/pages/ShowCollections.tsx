import { Box } from "@chakra-ui/layout"
import { Image, Text } from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from "react"
import { useParams } from "react-router"
import { GlobalCtx } from "../App"
import CollectionItems from "../components/CollectionItems"
import { useMediaQuery } from "@chakra-ui/media-query"
import EditCollection from "../components/EditCollection"
import DeleteCollection from "../components/DeleteCollection"
const ShowCollection = () => {

    const collectionId = useParams().id
    const {gState} = useContext(GlobalCtx)
    const {url,id} = gState
    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')

    const [collection, setCollection] = useState<any>(null)
    const collectionBackgroundColors = ['linear(to-r, #2193b0, #6dd5ed)', 'linear(to-r, #2980B9, #6DD5FA)', 'linear(to-r, #7F7FD5, #86A8E7, #91EAE4)', 'linear(to-r, #00B4DB, #0083B0)', 'linear(to-r, #74ebd5, #ACB6E5)',  ]

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
        
        <Box 
            d="flex"
            justifyContent="space-evenly"
            alignItems="center"
            bgGradient={collectionBackgroundColors[Math.floor(Math.random() * collectionBackgroundColors.length)]}
            h={isLargerThan600 ? '350px' : '450px'}
            flexDir={isLargerThan600 ? 'column' : 'row'}
            w="100%"
            >

            <Box w="30%" h="100%" d="flex" flexDir="column" alignItems="center" justifyContent="center">
                <Image 
                    src={collection.user_pfp} 
                    boxSize={isLargerThan600 ? "100px" : "300px"}
                    borderRadius="500px"
                    border="10px solid lightblue"
                    />
                <Text
                    fontSize="2em"
                    color="white"
                    mt={2}
                >{collection.user_username}</Text>
            </Box>

            <Box w="30%" h="100%" d="flex" flexDir="column" justifyContent="center" alignItems="center">
                <Text
                    fontSize={isLargerThan600 ? "2em" : "4em"}
                    color="white"
                    fontWeight="900"
                    textAlign="center"
                >{collection.title}</Text>
                <Text
                    color="whitesmoke"
                    fontSize={isLargerThan600 ? "1em" : "1.5em"}
                >{collection.description}</Text>
                {collection.user_id && collection.user_id===id ? <Box>
                        <EditCollection collectionId={collection.id} title={collection.title} description={collection.description}/>
                        <DeleteCollection collectionId={collection.id} title={collection.title} description={collection.description}/>
                    </Box> : null}
            </Box>


        </Box> 
    
        : <h1>Loading...</h1>}

        {collection ? <CollectionItems collectionId={collection.id}/> : null}
        </>
    )
}  

export default ShowCollection
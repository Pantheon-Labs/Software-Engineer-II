import { Box, Text } from "@chakra-ui/layout"
import React, { useState, useContext, useEffect } from "react"
import { GlobalCtx } from "../App"
import { Link } from "react-router-dom"
import { Image } from "@chakra-ui/image"
import { useMediaQuery } from "@chakra-ui/media-query"
import { Button } from "@chakra-ui/button"
import { useNavigate } from "react-router"

const CollectionItems = ({collectionId}:any) => {

    const {gState} = useContext(GlobalCtx)
    const {user_id, user_pfp, username, id, token, url} = gState
    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()
    const [items, setItems] = useState<any>(null)

    const getCollections = async () => {
        if (collectionId) { 
            const response = await fetch(`${url}savedpins/collections/${collectionId}`)
            const data = await response.json()
            setItems(data)
        }
    }

    useEffect(()=>{
        if (collectionId) {
            getCollections()
        }
    }, [collectionId])

    const removePin = async (pinId:number) => {
        const response = await fetch(`${url}savedpins/${pinId}`, {
            method: "delete"
        })
        navigate(`/collection/${collectionId}`)
    }

    const itemMapper = () => {
        return items.map((pin:any)=> {
            return <Link to={`/pin/${pin.original_post_id}`}>
            <Box w="100%" mr='50px' mt="50px" objectFit="cover">
                <Box
                    height={pin.image.clientHeight}
                    mt="30px"
                    mb="15px"
                    borderRadius="10px"
                    d="inline-block"
                    width="90%"
                    verticalAlign="top"
                    transition=".1s all"
                    _hover={{transform:"scale(1.03)"}}
                >
                    <Image src={pin.image} alt={pin.title} borderRadius="10px"/>
                    <Box d="flex" mt="10px">
                        <Image src={pin.user_pfp} boxSize="30px" borderRadius="50px" mr="10px"/>
                        <Text>{pin.user_username}</Text>
                        <Button 
                            ml="30px" 
                            fontSize="1em" 
                            h="30px" 
                            color="white"
                            bgGradient='linear(to-l, brand.100, brand.200)' 
                            _hover={{bgGradient:'linear(to-l, brand.100, brand.200)', transform:"scale(1.1)"}}
                            onClick={()=>{removePin(pin.id)}}
                        >Remove</Button>
                    </Box>
                </Box>
                </Box>
                </Link>

        })
    }


    return (
        <div         
        style={{
        columnCount: `${isLargerThan600 ? '1' : '6'}`,
        columnGap:'0',
        width:'100%',
        margin: 'auto',
        backgroundColor: "white"
    }}>
            {items ? itemMapper() : <h1>Loading...</h1>}
        </div>
    )
}

export default CollectionItems  
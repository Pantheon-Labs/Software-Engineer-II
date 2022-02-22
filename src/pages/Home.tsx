import { useState, useEffect, useContext } from "react"
import { GlobalCtx } from "../App"
import Hero from "../components/Hero"
import HomeEmptyState from "../components/HomeEmptyState"
import { Box, Text } from "@chakra-ui/layout"
import { Image } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/media-query"
import CreatePin from "../components/CreatePin"
import CreateCollection from "../components/CreateCollection"
import { Link } from "react-router-dom"

const Home = () => {
    const [pins, setPins] = useState<any>(null)
    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')

    const {gState} = useContext(GlobalCtx)
    const {username, token} = gState 


    const getPins = async () => {
        const response = await fetch("https://project-5-pin-backend.herokuapp.com/api/pins")
        const data = await response.json()
        setPins(data)
    }

    useEffect(()=>{
        getPins()
    }, [])

    const showPins = () => {
        return pins.map((pin:any)=>{
            return <Link to={`/pin/${pin.id}`}>
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
                    </Box>
                </Box>
                </Box>
                </Link>
        })
    }


    return (
        <div style={{backgroundColor:"white"}}>
            <Hero />
            {token ? <CreateCollection /> : null}
            <CreatePin getPins={getPins}/>
            <div         
            style={{
            columnCount: `${isLargerThan600 ? '1' : '6'}`,
            columnGap:'0',
            width:'90%',
            margin: 'auto',
            backgroundColor: "white"
        }}>
                {pins ? showPins() : <HomeEmptyState/>}
            </div>
        </div>
    )
}

export default Home
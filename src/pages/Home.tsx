import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import HomeEmptyState from "../components/HomeEmptyState"
import { Box, Text } from "@chakra-ui/layout"
import { Image } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/media-query"

const Home = () => {


    const [pins, setPins] = useState<any>(null)

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')


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
            return <Box w="100%" mr='50px' mt="50px" objectFit="cover">
                <Box
                    // bg="lightgray"
                    // bgGradient='linear(to-tr, lightgray, whitesmoke)'
                    // height={pin.image.clientHeight}
                    // width="100%"
                    // mt="30px"
                    // mb="15px"
                    // borderRadius="10px"
                    // objectFit="cover"
                    // key={pin.id}

                    // bgGradient='linear(to-tr, lightgray, whitesmoke)'
                    height={pin.image.clientHeight}
                    // width="23%"
                    // mr='30px'
                    // ml='30px'
                    mt="30px"
                    mb="15px"
                    borderRadius="10px"
                    d="inline-block"
                    width="90%"
                    verticalAlign="top"
                >
                    <Image src={pin.image} alt={pin.title} borderRadius="10px"/>
                    {/* <Text>{pin.title}</Text> */}
                    {/* <Text isTruncated>{pin.description}</Text> */}

                    <Box d="flex" mt="10px">
                        <Image src={pin.user_pfp} boxSize="30px" borderRadius="50px" mr="10px"/>
                        <Text>{pin.user_username}</Text>
                    </Box>
                </Box>

                </Box>
        })
    }


    return (
        <div style={{backgroundColor:"white"}}>
            <Hero />
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
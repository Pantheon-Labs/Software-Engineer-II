import { useState, useEffect } from "react"
import Hero from "../components/Hero"
import HomeEmptyState from "../components/HomeEmptyState"
import { Box, Text } from "@chakra-ui/layout"

const Home = () => {


    const [pins, setPins] = useState<any>(null)

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
            return <Box
                    bg="lightgray"
                    height="600px"
                    width="15%"
                    mr='50px'
                    mt="50px"
                    borderRadius="10px"
                    key={pin.id}
                >
                    <Text>{pin.title}</Text>
                </Box>
        })
    }


    return (
        <>
            <Hero />
            <Box d="flex" bg="white" justifyContent="center">
                {pins ? showPins() : <HomeEmptyState/>}
            </Box>
        </>
    )
}

export default Home
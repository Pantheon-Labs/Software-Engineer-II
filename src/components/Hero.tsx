import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, Button, IconButton, useMediaQuery } from '@chakra-ui/react'
import {FaSearch} from "react-icons/fa"
import { Box } from "@chakra-ui/layout"
import { useState, useEffect, useContext } from "react"
import { GlobalCtx } from "../App"
import { delay } from "lodash"



const Hero = ({setPins, getPins}:any) => {
    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')


    const {gState} = useContext(GlobalCtx)
    const {username, token, id, pfp, url} = gState 

    const [term, setTerm] = useState<string>("")

    const handleChange = async (event:React.FormEvent<HTMLInputElement>) => {
        setTerm(event.currentTarget.value)
        if (term !== "") {
            fetch(`${url}pins/search`, {
                method:"post",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({term: term})
            })
            .then(async (res)=>{
                const data = await res.json()
                if (data.length) {
                    setPins(data)
                } else {
                    setPins([])
                }
            })
        } 
    }

    useEffect(()=>{
        if (term === "") {
            getPins()
        }
    }, [term])

    return (
        <Box
            d="flex"
            justifyContent="center"
            alignItems="center"
            bgGradient='linear(to-r, brand.100, brand.200)'
            h={isLargerThan600 ? '300px' : '450px'}
            w="100%"
        >
            <FormControl
                d="flex"
                flexDirection="column"
                w="60%"
            >
                <FormLabel
                    fontSize={isLargerThan600 ? '2em' : '4em'}
                    color="white"
                    d="block"
                    margin="auto"
                >Get Inspired!</FormLabel>
                <Box
                    d="flex"
                    marginTop="20px"
                >
                    <Input 
                        bg="white"
                        h="60px"
                        placeholder="Try 'pina colada'!"
                        onChange={handleChange}
                    />
                    <IconButton 
                        aria-label="Search database"
                        type="submit" 
                        icon={<FaSearch/>}
                        position="absolute"
                        right="0"
                        h="60px"
                        w="60px"
                    ></IconButton>
                </Box>

            </FormControl>
        </Box>
    )
}

export default Hero
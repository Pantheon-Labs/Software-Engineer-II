import React, { useContext, useState, useEffect } from "react";
import { GlobalCtx } from "../App";
import { useNavigate } from "react-router";
import { Box, Text, Button } from '@chakra-ui/react'
import { Image } from "@chakra-ui/image";
import { useMediaQuery } from "@chakra-ui/media-query";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
} from '@chakra-ui/react'


const Profile = () => {

    const {gState, setGstate} = useContext(GlobalCtx)
    const {token, pfp, username, id, url} = gState
    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()
    const [profile, setProfile] = useState<any>({
        username: "",
        pfp: ""
    })

    useEffect(()=>{
        setProfile({
            username: username,
            pfp: pfp
        })
    }, [gState])

    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        const newForm = {...profile}
        newForm[event.currentTarget.name] = event.currentTarget.value 
        setProfile(newForm)
    }

    const handleSubmit = async (event:React.FormEvent) => {
        event.preventDefault()
        await fetch(`${url}users/${id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        })
        .then(async (res) => {
            const data = await res.json()
            setGstate({...gState, username: data.username, pfp: data.pfp})
            window.localStorage.removeItem("token")
            navigate("/login")
        })
    }

    return (
        <Box bg="whitesmoke" h="100vh" d="flex" justifyContent="center" alignItems="center">
            <Box 
            w={isLargerThan600 ? "80%" : "50%"}
            maxWidth="600px" 
            h={isLargerThan600 ? "600px" : "800px"} 
            bg="white" 
            mt={-15}
            d="flex"
            flexDir="column"
            alignItems="center">
                <Image src={pfp} 
                boxSize={isLargerThan600 ? "200px" : "400px"}
                borderRadius="500px"
                mt={20}/>
                <form onSubmit={handleSubmit}>
                    <FormControl mb={5}>
                        <FormLabel>Username</FormLabel>
                        <Input id='username' type='text' name="username" value={profile.username} onChange={handleChange}/>
                    </FormControl>

                    <FormControl >
                        <FormLabel>Profile Picture</FormLabel>
                        <Input id='description' type='text' name="pfp" value={profile.pfp} onChange={handleChange}/>
                        <FormHelperText>Image URL</FormHelperText>
                    </FormControl>

                    <FormControl>
                    <Button type="submit" mt={10} w="100%" bgGradient="linear(to-r, brand.100, brand.200)" color="white">
                        Update
                    </Button>
                    </FormControl>
                </form>
            </Box>
        </Box>
    )
}

export default Profile


import React from "react";
import { useNavigate } from "react-router";
import { Box, Text, Button } from '@chakra-ui/react'
import { Image } from "@chakra-ui/image";
import logo from "../assets/logo.png"

const Header = () => {

    const nav = useNavigate()


    return (
        <Box
        h="80px"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        >
            <Image 
            src={logo}
            alt='Pinterest Logo'
            boxSize='60px'
            ml={5}
            cursor='pointer'
            onClick={()=>{nav("/")}}
            ></Image>

            <Box>
                <Button
                mr={5}
                onClick={()=>{nav("/signup")}}
                >
                    <Text>Sign up</Text>
                </Button>


                <Button
                mr={5}
                onClick={()=>{nav("/login")}}
                >
                    <Text>Log in</Text>
                </Button>
            </Box>

        </Box>
    )
}

export default Header
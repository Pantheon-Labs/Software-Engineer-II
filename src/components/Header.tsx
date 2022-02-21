import React from "react";
import { Box, Text, Button } from '@chakra-ui/react'
import { Image } from "@chakra-ui/image";
import logo from "../assets/logo (1).png"

const Header = () => {
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
            ></Image>

            <Box>
                <Button
                mr={5}
                >
                    <Text>Sign up</Text>
                </Button>


                <Button
                mr={5}
                >
                    <Text>Log in</Text>
                </Button>
            </Box>

        </Box>
    )
}

export default Header
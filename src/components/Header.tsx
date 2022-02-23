import { useNavigate } from "react-router";
import { useContext, useState, useEffect } from "react";
import { GlobalCtx } from "../App";
import { Box, Text, Button } from '@chakra-ui/react'
import { Image } from "@chakra-ui/image";
import logo from "../assets/logo.png"
import ProfileDrawer from "./ProfileDrawer";
import { useDisclosure } from "@chakra-ui/react";
import { useRef } from "react";


const Header = () => {
    const nav = useNavigate()
    const {gState} = useContext(GlobalCtx)
    const {token, pfp, username} = gState

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef:any = useRef()

    return (
        <Box
        h="80px"
        d="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
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

            {token ? <ProfileDrawer pfp={pfp} username={username}/> :   
                <Box>                
                    <Button
                    mr={5}
                    onClick={()=>{nav("/signup")}}
                    >
                        <Text>Sign Up</Text>
                    </Button>

                    <Button
                    mr={5}
                    onClick={()=>{nav("/login")}}
                    >
                        <Text>Log in</Text>
                    </Button>
                </Box>
            }
            </Box>

        </Box>
    )
}

export default Header
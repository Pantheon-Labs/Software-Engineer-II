import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

import { useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import { Button } from '@chakra-ui/button'
import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { GlobalCtx } from '../App'

const ProfileDrawer = ({pfp, username}:any) => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef:any = useRef()

    const {gState, setGstate} = useContext(GlobalCtx)

    const navToProfilePage = () => {
        navigate("/profile")
        onClose()
    }



    const logout = () => {
      window.localStorage.removeItem("token")
      setGstate({
        ...gState,
        url: "https://project-5-pin-backend.herokuapp.com/api/",
        token: null,
        username: null,
        email: null,
        pfp: null,
        id: null
      })
      navigate("/")
    }

    return (
        <>
          <Image src={pfp} boxSize="40px" borderRadius="50px" mr={5} ref={btnRef} onClick={onOpen}
            _hover={{cursor:"pointer"}}
          /> 

          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}

          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Hi, {username}!</DrawerHeader>
    
              <DrawerBody>
                <Box d="flex" flexDir="column" alignItems="center">
                    <Image src={pfp} borderRadius="500px" boxSize="250px" objectFit="cover" border="10px solid lightblue"/>
                    <Button mt="20px" bgGradient='linear(to-r, brand.100, brand.200)' color="white" w="100%" transition=".1s all" _hover={{bgGradient:'linear(to-r, brand.100, brand.200)', transform:"scale(1.1)"}} onClick={navToProfilePage}
                    >Edit Profile</Button>
                </Box>
              </DrawerBody> 
    
              <DrawerFooter>
                <Button variant='outline' mr={3} onClick={logout} bg="red.500" color="white" _hover={{bg:"red.500", transform:"scale(1.1)"}}>
                  Logout
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </>
      )
}

export default ProfileDrawer
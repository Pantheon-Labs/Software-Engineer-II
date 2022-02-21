import { Box } from "@chakra-ui/layout"

import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GlobalCtx } from "../App"
import { useMediaQuery } from "@chakra-ui/media-query"
import { Button, Text, useDisclosure, Textarea } from '@chakra-ui/react'
import {FaPlus} from "react-icons/fa"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input
  } from '@chakra-ui/react'


const CreatePin = () => {

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()

    const {gState} = useContext(GlobalCtx)
    const {token, username, id} = gState

    interface CreateForm {
        title: string,
        description: string,
        image: string,
        user_id: number,
        user_username: string
    }


    const [createForm, setCreateForm] = useState<CreateForm>({
        title: "",
        description: "",
        image: "",
        user_id: 0,
        user_username: ""
    })

    const { isOpen, onOpen, onClose } = useDisclosure()

    return(
        <>
        <Button leftIcon={<FaPlus/>} 
            size="lg" 
            borderRadius="100px" 
            bgGradient='linear(to-r, brand.100, brand.200)' 
            color="white" ml={isLargerThan600 ? '5%' : '10%'} 
            mt={5} 
            transition=".3s all" 
            onClick={()=>{
                if (token) {
                    onOpen()
                } else {
                    navigate("/signup")
                }
                }}
            _hover={{
                transform:"scale(1.1)"
                }}
        >
            <Text>Create Pin</Text>
        </Button>


        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader fontSize="2em" color="brand.100">Create Pin</ModalHeader>
                <ModalCloseButton />
                <ModalBody>

                    <form>
                        <FormControl mb='20px'>
                            <FormLabel htmlFor='title'>Title</FormLabel>
                            <Input id='title' type='text' />
                            <FormHelperText>Enter the title or name for your pin.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description' >Description</FormLabel>
                            <Input id='description' type='textarea' />
                            <FormHelperText>Write whatever you want to describe your pin.</FormHelperText>
                        </FormControl>

                        <FormControl mb="20px">
                            <FormLabel htmlFor='description'>Image</FormLabel>
                            <Input id='image' type='file' accept="image/*" multiple={false}/>
                            <FormHelperText>Upload a file for your pin's image.</FormHelperText>
                        </FormControl>

                        <FormControl ml="80%" mb="20px">
                            <Button 
                                type="submit" 
                                bgGradient='linear(to-r, brand.100, brand.200)'  
                                color="white"
                                _hover={{
                                    bgGradient:'linear(to-r, brand.100, brand.200)',
                                    transform: "scale(1.1)"  
                                }}
                            >Submit</Button>
                        </FormControl>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>



        </>


    )
}

export default CreatePin
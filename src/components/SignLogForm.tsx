import logo from "../assets/logo(white).png"
import { Button, Image, Text } from '@chakra-ui/react'
import { Box } from "@chakra-ui/layout"
import {FormControl, FormLabel, Input} from '@chakra-ui/react'


interface Props {
    signOrLog: string;
}

const SignLogForm: React.FC<Props> = ({signOrLog}) => {

    return (
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                w="80%"
                maxWidth="1100px"
                h="600px"
                m="auto"
                boxShadow="5px 5px 10px lightgray"
                bg="white"
            >

                <Box
                    w="50%"
                    h="600px"
                    bgGradient='linear(to-r, brand.100, brand.200)'
                >
                    <Image 
                    src={logo}
                    alt='Pinterest Logo'
                    boxSize='200px'
                    m="auto"
                    mt="180px"
                    ></Image>
                </Box>

            <Box
                w="50%"
            >
                <form style={{width: "80%", margin:"auto"}}>
                    <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" placeholder="pinacolada64" />
                    </FormControl>

                    <FormControl mt={6}>
                    <FormLabel>Email</FormLabel>
                    <Input type="email" placeholder="test@test.com" />
                    </FormControl>


                    <FormControl mt={6}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="*******" />
                    </FormControl>
                    <Button width="full" mt={4} type="submit">
                        {signOrLog === 'login' ? 'Log in' : 'Sign up'}
                    </Button>
                </form>
            </Box>

            </Box>

    )
}

export default SignLogForm
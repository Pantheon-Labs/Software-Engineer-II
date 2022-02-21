import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input, Button, IconButton, useMediaQuery } from '@chakra-ui/react'
import {FaSearch} from "react-icons/fa"
import { Box } from "@chakra-ui/layout"

const Hero = () => {

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')



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
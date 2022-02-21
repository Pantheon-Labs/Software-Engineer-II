import SignLogForm from "../components/SignLogForm"
import { Button, Image, Text } from '@chakra-ui/react'
import { Box } from "@chakra-ui/layout"


interface Props {
    signOrLog: string;
}


const Login: React.FC<Props> = ({signOrLog}) => {
    return(

        <Box
            bg="whitesmoke"
            h="100vh"
            d="flex"
            
        >
            <SignLogForm signOrLog={signOrLog}/>
        </Box>

    )
}

export default Login
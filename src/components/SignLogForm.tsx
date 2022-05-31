import logo from "../assets/logo(white).png"
import { useState, useContext } from "react"
import {useNavigate} from "react-router-dom"
import { Button, Image, Text } from '@chakra-ui/react'
import { Box } from "@chakra-ui/layout"
import {FormControl, FormLabel, Input, useMediaQuery} from '@chakra-ui/react'
import { GlobalCtx } from "../App"



interface Props {
    signOrLog: string;
}

const SignLogForm: React.FC<Props> = ({signOrLog}) => {

    const [isLargerThan600] = useMediaQuery('(max-width: 600px)')
    const navigate = useNavigate()

    const {gState, setGstate} = useContext(GlobalCtx)
    const {url} = gState

    const [form, setForm] = useState<any>({
        username: "",
        email: "",
        password: ""
    })

    const handleChange = (event:React.FormEvent<HTMLInputElement>) => {  
        const newForm = {...form}  
        newForm[event.currentTarget.name] = event.currentTarget.value
        setForm(newForm)
    }

    const handleSubmit = (event:React.FormEvent) => {
        event.preventDefault()
        const logOrSign:string = signOrLog === 'login' ? 'login' : 'signup'
        const {username, email, password} = form
        fetch(`${url}users/${logOrSign}`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, password})
        })
        .then((response)=> response.json())
        .then((data)=>{
            console.log(data)
            setForm({...form, username:"", email:"", password: ""})
            if(data.token) {
                window.localStorage.setItem("token", JSON.stringify(data))
                setGstate({
                    ...gState,
                    token: data.token,
                    username: data.username,
                    email: data.email,
                    pfp: data.pfp,
                    id: data.id
                })
            }
            signOrLog === "login" ? navigate("/") : navigate("/login")
        })
    }

    return (
            <Box
                d="flex"
                justifyContent="space-between"
                alignItems="center"
                w="80%"
                maxWidth="1100px"
                h={isLargerThan600 ? '300px' : '600px'}
                m="auto"
                boxShadow="5px 5px 10px lightgray"
                bg="white"
            >

                <Box
                    w="50%"
                    h={isLargerThan600 ? '300px' : '600px'}
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
                <form style={{width: "80%", margin:"auto"}} onSubmit={handleSubmit}>
                    <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input type="text" placeholder="pinacolada64" name="username" value={form.username} onChange={handleChange}/>
                    </FormControl>
                    
                    {signOrLog === "signup" ?
                        <FormControl mt={6}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="test@test.com" name="email" value={form.email} onChange={handleChange}/>
                        </FormControl>  
                    : null}



                    <FormControl mt={6}>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="*******" name="password" value={form.password} onChange={handleChange}/>
                    </FormControl>
                    <FormControl>
                    <Input type="submit" width="full" mt={4} value={signOrLog === 'login' ? 'Log In' : 'Sign Up'} bg="brand.100" color="white" fontSize="1.1em"/>
                    </FormControl>

                </form>
            </Box>

            </Box>

    )
}

export default SignLogForm
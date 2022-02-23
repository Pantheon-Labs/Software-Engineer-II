// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Box } from "@chakra-ui/layout";
import Header from "./components/Header";
import Main from "./pages/Main"
import {createContext, useState, useEffect} from "react"
export const GlobalCtx = createContext<any>(null)

function App() {
  const [gState, setGstate] = useState<any>({
    url: "https://project-5-pin-backend.herokuapp.com/api/",
    token: null,
    username: null,
    email: null,
    pfp: null,
    id: null
  })

  useEffect(()=>{
    if(window.localStorage.getItem("token")){
    const token = JSON.parse(window.localStorage.getItem("token") || "{}")
    console.log(token)
    if(token) {
      setGstate({
        ...gState,
        token: token.token,
        username: token.username,
        email: token.email,
        pfp: token.pfp,
        id: token.id
      })
    }
  }
  }, [])

  return (
    <GlobalCtx.Provider value={{gState, setGstate}}>
    <Box
      bg="whitesmoke"
    >
      <Header />
      <Main />
    </Box>
    </GlobalCtx.Provider>
  );
}

export default App;

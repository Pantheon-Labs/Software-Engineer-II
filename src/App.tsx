// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Box } from "@chakra-ui/layout";
import Header from "./components/Header";
import Main from "./pages/Main"
import {createContext, useState} from "react"
export const GlobalCtx = createContext<any>(null)

function App() {

  interface GlobalState {
    url: string,
    token: string | null,
    username: string | null,
    email: string | null,
    pfp: string | null,
    id: number | null
  }

  const [gState, setGstate] = useState<GlobalState | null>({
    url: "https://project-5-pin-backend.herokuapp.com/api/",
    token: null,
    username: null,
    email: null,
    pfp: null,
    id: null
  })

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

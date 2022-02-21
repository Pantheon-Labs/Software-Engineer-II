// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import { Box } from "@chakra-ui/layout";
import Header from "./components/Header";
import Main from "./pages/Main"

function App() {
  return (
    <Box
      bg="whitesmoke"
    >
      <Header />
      <Main />
    </Box>
  );
}

export default App;

import {Route, Routes} from "react-router-dom"

import Home from "./Home"
import Login from "./SignupLogin"
import ShowPin from "./ShowPin"
import ShowCollection from "./ShowCollections"

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/pin/:id" element={<ShowPin />}/>
            <Route path="/collection/:id" element={<ShowCollection />}/>
            <Route path="/signup" element={<Login signOrLog="signup"/>}/>
            <Route path="/login" element={<Login signOrLog="login"/>}/>
        </Routes>
    )
}

export default Main
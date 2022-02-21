import {Route, Routes} from "react-router-dom"

import Home from "./Home"
import Login from "./SignupLogin"

const Main = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/signup" element={<Login signOrLog="signup"/>}/>
            <Route path="/login" element={<Login signOrLog="login"/>}/>
        </Routes>
    )
}

export default Main
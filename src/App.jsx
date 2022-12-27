import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import RequireAuth from "./components/RequireAuth"
import Home from "./Routes/Home"
import Login from "./Routes/Login"

const App = () => {

  return (
    <>
      <Navbar/>
      <h1>App</h1>        
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/" element={
          <RequireAuth>
            <Home/> 
          </RequireAuth>
        }/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App

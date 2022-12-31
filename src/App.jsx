import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import LayoutContainer from "./components/LayoutContainer"
import Navbar from "./components/Navbar"
import RequireAuth from "./components/RequireAuth"
import { UserContext } from "./context/UserProvider"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Register from "./Routes/Register"

const App = () => {

  const {user} = useContext(UserContext)

  if(user === false){
    return <p>Loading...</p>
  }

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
        <Route path="/" element={<LayoutContainer/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App

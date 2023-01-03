import { useContext } from "react"
import { Routes, Route } from "react-router-dom"
import LayoutContainer from "./components/LayoutContainer"
import Navbar from "./components/Navbar"
import LayoutRequireAuth from "./components/LayoutRequireAuth"
import { UserContext } from "./context/UserProvider"
import Home from "./Routes/Home"
import Login from "./Routes/Login"
import Register from "./Routes/Register"
import Profile from "./Routes/Profile"
import NotFound from "./Routes/NotFound"

const App = () => {

  const {user} = useContext(UserContext)

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Navbar/>       
      <Routes>
        {/* <Route path="/" element={<Home/>}/> */}
        <Route path="/" element={
          <LayoutRequireAuth>
            <Home/>
          </LayoutRequireAuth>
        }/>
        <Route path="/profile" element={
          <LayoutRequireAuth>
            <Profile/>
          </LayoutRequireAuth>
        }/>
        <Route path="/" element={<LayoutContainer/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route path="/*" element={<NotFound/>}></Route>
      </Routes>
    </>
  )
}

export default App

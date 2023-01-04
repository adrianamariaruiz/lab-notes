import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import Button from "./Button"

const Navbar = () => {

    const {user, signOutUser} = useContext(UserContext)

    const handleClickLogout = async () => {
      try {
        await signOutUser()
      } catch (error) {
        console.log(error.code)
      }

    }

    const buttonPurple = 'shadow-lg focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 m-1.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to='/' className='flex items-center'>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">App</span>
        </Link>

      <div className="flex md:order-2">
        {
            user ? (
                <>
                <NavLink to={'/'} className={buttonPurple}>Inicio</NavLink> 
                <Button onClick={handleClickLogout} color='red' text='Logout'/>
                </>
            ) : (
              <>
               <NavLink 
                to={'/login'}
                className={buttonPurple} 
               >
                Login
              </NavLink> 
              <NavLink 
                to={'/register'}
                className={buttonPurple}
              >
                Register
              </NavLink> 
              </>
            )
        }
      
      </div>

      </div>
        
    </nav>
  )
}

export default Navbar
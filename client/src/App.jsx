import {createBrowserRouter, RouterProvider, Route, Outlet} from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Register from './pages/Register'
import  Login  from './pages/Login'
import  Write  from './pages/Write'
import  SinglePost  from './pages/SinglePost'
import  Home  from './pages/Home'
import './style.sass'

const Layout = () =>{
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}


const router = createBrowserRouter([
  {
    path:"/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<SinglePost/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {

  }

])
const App = () => {
  return (
    <div className='app'>
      <div className="container">
        <RouterProvider router={router}></RouterProvider>
      </div>
    </div>
  )
}


export default App
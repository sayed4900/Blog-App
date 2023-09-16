import { createBrowserRouter, RouterProvider, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import Write from './pages/Write';
import SinglePost from './pages/SinglePost';
import User from './pages/User';
import UserNotifications from './pages/UserNotifications';
import Home from './pages/Home';
import './style.css';
import { io } from 'socket.io-client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';

const Layout = ({ socket, children }) => {
  return (
    <>
      <Navbar socket={socket} />
      <Outlet  />
      <Footer />
    </>
  );
}

const App = () => {
  const [socket, setSocket] = useState(null);
  const {currentUser} = useContext(AuthContext);
  
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    console.log(socket) ;
  }, [currentUser]);

  useEffect(() => {
    currentUser&&socket?.emit("newUser", currentUser?.user_id);
  }, [socket, currentUser]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout socket={socket} />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/post/:id",
          element: <SinglePost />
        },
        {
          path: "/write",
          element: <Write  socket={socket}  />
        },
        {
          path: "/user/:id",
          element: <User />
        },
        {
          path: "/:id/notifications",
          element: <UserNotifications socket={socket} />
        }
      ]
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/login",
      element: <Login />
    },
  ]);

  return (
    <div className='app'>
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App;

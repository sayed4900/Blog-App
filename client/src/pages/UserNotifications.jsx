import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from '../context/AuthContext'
import {baseUrl} from '../utils/service'





const UserNotifications = ({socket}) => {


  const {currentUser}  = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  
  
  
  const getUserNotifications = async()=>{
    try{
      const res = await axios.get(`${baseUrl}/users/${currentUser.user_id}/notifications`);
      console.log(res.data);
      setNotifications(res.data.notifications)
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    
    getUserNotifications();
  },[])

  useEffect(() => {
    console.log(socket)
    // Listen for new post notifications
    socket?.on('newNotification', (data) => {
      console.log('💥💥💥New post notification received:', data);
      // Update the notifications state
      getUserNotifications();
    });

    // Clean up the WebSocket connection on component unmount
    return () => {
      socket?.disconnect();
    };
  }, []);
  
  return (
    <div className="notification-container">
      <h3>Your Notifications</h3>
      <ul className="notification-list">
        {notifications.map((n, index) => (
          <li key={index}>
            {n.message}. <Link to={`/post/${n.post_id}`}>Click here to see the post</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserNotifications
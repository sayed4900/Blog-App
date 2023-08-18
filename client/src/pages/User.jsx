import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Edit from '../imges/edit.png'
import Delete from '../imges/delete.png'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from '../context/AuthContext'
import {baseUrl} from '../utils/service'




const User = () => {
  const params = useParams();
  const {currentUser}  = useContext(AuthContext);
  const [userData, setUserData] = useState({});
  const [isFollowing, setIsFollowing] = useState(false);
  const [userFollowers, setUserFollower] = useState(0);
  const [userFollowing, setUserFollowing] = useState(0);
  useEffect(()=>{
    const getUserData = async()=>{
      try{

        const res = await axios.get(`${baseUrl}/users/${params.id}`);
        setUserData(res.data);
        console.log(res.data.data)
      }catch(err){
        console.log(err)
      }
    }
    const checkFollowingStatus = async ()=>{
      const res = await axios.post(`${baseUrl}/users/check-follow-status`,{follower_user_id:currentUser.user_id,following_user_id:params.id});
      
      console.log(res.data);
      setIsFollowing(res.data.isFollowing);
    }
    const getUserFollowers = async ()=>{
      try{

        const res = await axios.get(`${baseUrl}/users/get-user-followers/${params.id}`)  
        console.log(res.data);
        setUserFollower(res.data.numberOfFollowers)
      }catch(err){
        console.log(err);
      }
      
    }
    const getUserFollowing = async ()=>{
      try{
        const res = await axios.get(`${baseUrl}/users/get-user-following/${params.id}`)  
        setUserFollowing(res.data.numberOfFollowing)
      }catch(err){
        console.log(err)
      }
    
    }
    
    getUserData();
    checkFollowingStatus();
    getUserFollowers();
    getUserFollowing();
  },[])

  const follow = async()=>{
    try{
      const res = await axios.post(`${baseUrl}/users/follow`,
      {follower_user_id:currentUser.user_id,following_user_id:params.id});
      console.log(res.data);
    }catch(err){
      console.log(err)
    }
  }
  const unfollow = async()=>{
    try{

      const res = await axios.post(`${baseUrl}/users/unfollow`,
      {follower_user_id:currentUser.user_id,following_user_id:params.id});
      console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }
  
  const handleToggleFollow = async() => {
    // Toggle the follow status and update the state
    setIsFollowing(prevIsFollowing => !prevIsFollowing);

    if (!isFollowing)
      follow() ;
    else
      unfollow();
  };

  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent
  }
  return (
    <div className='user-profile'>
      <div className='user-info'>
        <h3>username: {userData.username}</h3>
        {/* Toggle Follow/Unfollow button */}
        {currentUser.user_id !== params.id ? (
          <button onClick={handleToggleFollow}>
            {isFollowing ? 'Unfollow' : 'Follow'}
          </button>
        ) : null}
      </div>
      <div className='user-stats'>
        <p>Followers : <strong>{userFollowers}</strong></p>
        <p>Following : <strong>{userFollowing}</strong> </p>
        <h3></h3>
      </div>
      <div className='posts'>
        {userData.data && userData.data.map(post =>(
          <div className='post' key={post.post_id}>
            <div className='img'>
              <img src={`../../public/uploads/${post?.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.post_id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.content)}</p>
              <button><Link to={`/post/${post.post_id}`}>Read More</Link></button>
            </div>
          </div> 
          )
        )}
      </div>
    </div>
  )
}

export default User
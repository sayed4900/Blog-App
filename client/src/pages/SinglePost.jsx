import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Edit from '../imges/edit.png'
import Delete from '../imges/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from '../context/AuthContext'
import {baseUrl} from '../utils/service'

const SinglePost = () => {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser );
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate()

  const post_id = location.pathname.split('/')[2];
  
  const deletePost = async()=>{
    const res = await axios.delete(`${baseUrl}/posts/${post.post_id}`);
    console.log(res)
    navigate("/");
  }

  useEffect(()=>{
    const getPost = async()=>{
      try{
        const res = await axios.get(`${baseUrl}/posts/${post_id}`);
        setPost(res.data.post)
        console.log(res.data.post)
        
      }catch(err){
        console.log(err);
      }
    }
    getPost();
  },[post_id])

  return (
    <div className='single'>
      <div className="content">
        <img src={post?.img}/>
      
        <div className="user">
          <img src={post?.user_img}/>
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.post_created_at).fromNow()}</p>
          </div>
          {/* {currentUser?.user_id==post?.user_id */}
          &&
          <div className="edit">
            <Link to={'/write?edit=2'}>
              <img src={Edit}/>
            </Link>
            <img src={Delete} onClick={deletePost}/>
          </div>
        {/* } */}
        </div>
        <h1>{post?.title}</h1>
        {post?.content}
      </div>
      <Menu/>
    </div>
  )
}

export default SinglePost
import React, { useContext, useEffect, useState } from 'react'
import Menu from '../components/Menu';
import Edit from '../imges/edit.png'
import Delete from '../imges/delete.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {AuthContext} from '../context/AuthContext'
import {baseUrl} from '../utils/service'
import DOMPurify from 'dompurify'

const SinglePost = () => {
  const token = localStorage.getItem("token");
  console.log(token)
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser );
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate()

  const post_id = location.pathname.split('/')[2];
  
  const deletePost = async()=>{
    const res = await axios.post(`${baseUrl}/posts/${post.post_id}`,{token});
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
    const getImage = async()=>{
      try{
        const res = await axios.get(`${baseUrl}/posts/get-img/${post?.img}`);
        ccon
      }catch(err){
        console.log(err)
      }
    }
    getPost();
  },[post_id])

  return (
    <div className='single'>
      <div className="content">
        <img src={`../../public/uploads/${post?.img}`}/>
        
        <div className="user">
          <img src={`../../public/uploads/${post?.user_img}`}/>
          <div className="info">
            <span>{post?.username}</span>
            <p>Posted {moment(post?.post_created_at).fromNow()}</p>
          </div>
          {currentUser?.user_id==post?.user_id
          &&
          <div className="edit">
            <Link to={`/write?edit=${post.post_id}`} state={post}>
              <img src={Edit}/>
            </Link>
            <img src={Delete} onClick={deletePost}/>
          </div>
        }
        </div>
        <h1>{post?.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></p> 
      </div>
      <Menu cat={post?.cat}/>
    </div>
  )
}

export default SinglePost
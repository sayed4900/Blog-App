import React, { useEffect, useState } from 'react'
import {baseUrl} from '../utils/service';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';



const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  console.log(location)
  const cat = location.search;
 
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html,"text/html");
    return doc.body.textContent
  }
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${baseUrl}/posts/${cat}`);
        setPosts(res.data.posts)
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[cat])

  return (
    <div className='home'>
  
      <div className="posts">
      <div className="posts">
        {posts
            .filter((post) => post.post_id) // Filter out posts with no post_id
            .map((post) => (
              <div className="post" key={post.post_id}>
                <div className="img">
                  <img src={`../../public/uploads/${post?.img}`} alt="" />
                </div>
                <div className="content">
                  <Link to={`/post/${post.post_id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{getText(post.content)}</p>
                  <button>
                    <Link to={`/post/${post.post_id}`}>Read More</Link>
                  </button>
                </div>
              </div>
            ))}
        </div>

      </div>
    </div>
  )
}

export default Home
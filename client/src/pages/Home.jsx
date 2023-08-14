import React, { useEffect, useState } from 'react'
import {baseUrl} from '../utils/service';
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';


// const posts = [
//     {
//       id: 1,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 2,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 3,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//     {
//       id: 4,
//       title: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
//       desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!",
//       img: "https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     },
//   ];

const Home = () => {
  const [posts, setPosts] = useState([]);

  const location = useLocation();
  console.log(location)
  const cat = location.search;

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
        {posts.map(post=>(
          <div className='post' key={post.post_id}>
            <div className='img'>
              <img src={`../../../server/public/uploads/${post?.img}`} alt="" />
            </div>
            <div className="content">
              <Link to={`/post/${post.post_id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{post.content}</p>
              <button>Read More</button>
            </div>
          </div> 
          
          )
        )}
      </div>
    </div>
  )
}

export default Home
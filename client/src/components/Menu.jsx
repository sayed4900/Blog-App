import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/service";
import { Link } from "react-router-dom";

const Menu = ({cat }) => {
  const [posts, setPosts] = useState([]);


  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res = await axios.get(`${baseUrl}/posts/?cat=${cat}`);
        setPosts(res.data.posts)
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[cat])
 
  return ( 
    <div className="menu" > 
      <h1>Other posts you may like</h1>
      {posts.map((post, i) => {
        if (i >= 4) {
          return null; // Skip rendering posts after the first 4
        }

        return (
          <div className="post" key={post.post_id}>
            <img src={`../../public/uploads/${post?.img}`} alt={`Post ${i}`} key={i} />
            <h2>{post.title}</h2>
            <button><Link to={`/post/${post.post_id}`}>Read More</Link></button>
          </div>
        );
    })}
    </div>
  );
}
 
export default Menu;
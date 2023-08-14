const  jwt  = require('jsonwebtoken');
const pool = require('../utils/db.js');
const {promisify} = require('util')

exports.addPost = async(req,res)=>{
  try{
    const {title, content, user_id, cat, img} = req.body;
    
    const insertQuery = 
    `INSERT INTO posts (title, content, user_id, cat, img) VALUES (?, ?, ?, ?, ?)`;

    await pool.execute(insertQuery,[title,content,user_id,cat,img]);
    res.status(201).json({status:"success"});
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}

exports.getPost = async(req,res)=>{
  try{

    const q = "SELECT u.user_id, u.username , u.img AS user_img, p.img, p.post_id, p.title, p.content, p.cat, p.created_at AS post_created_at, p.updated_at AS post_updated_at FROM posts AS p JOIN users AS u ON p.user_id = u.user_id WHERE p.post_id = ?";

    const [post] = await pool.execute(q,[req.params.id]);
    if (!post.length)
      return res.status(200).json({status:"fail",message:"this post is deleted"})
    res.status(200).json({status:"success",post:post[0]});
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}

exports.getAllPosts = async(req,res)=>{
  try{
    const params =[];
    const cat = req.query.cat; // Get the 'cat' query parameter from the request

    let q = "SELECT * FROM posts"; // Default query
    
    // If 'cat' parameter is provided, modify the query
    if (cat) {
      q = "SELECT * FROM posts WHERE cat = ?";
      params.push(cat);
    }

    // const q = req.query?.cat ?
    // "SELECT * FROM posts where cat=?"
    // :"SELECT * FROM posts";

    const [posts] = await pool.execute(q,params);

    
    res.status(200).json({status:"success",posts})
    // create posts on database!
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}

exports.deletePost=async(req,res)=>{
  try{ 
    
    const token = req.cookies?.access_token;
    // console.log(`token➡️ ${token}`);
    if (!token)
      return res.status(401).json({status:"fail", message:"Not Authentcaited"});
    
    const userInfo =  await promisify(jwt.verify)(token,"SECERT") ;
    console.log(userInfo.id);
    
    const q = "DELETE FROM posts where post_id = ? AND user_id = ?" ;
    const result = await pool.execute(q,[req.params.id,userInfo.id]);
  
    if (!result[0].affectedRows)
      return res.status(404).json({status:"fail",message:"Your are't the owner of the post!"})
    res.status(200).json({status:"success",message:"Post Deleted",result})
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
exports.updatePost=async(req,res)=>{
  try{
    const {title, content, cat, img} = req.body;

    const q = `UPDATE posts 
    SET title=?, content = ? , cat = ?, img = ?
    WHERE post_id = ?`
    const result = await pool.execute(q,[title, content, cat, img, req.params.id]) ; 
    console.log(result);
    if(!result[0].affectedRows)
      return res.status(401).json({status:"fail",message:"?"})
    res.status(200).json({status:"success",result})
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}

const pool = require('../utils/db.js');

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
    
    res.status(201).json({status:"success",post:post[0]});
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
    const q = "DELETE FROM posts where post_id = ?" ;
    await pool.execute(q,[req.params.id]);
    res.status(200).json({status:"success"})
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
exports.updatePost=async(req,res)=>{
  try{
    res.status(200).json("Con")
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
 
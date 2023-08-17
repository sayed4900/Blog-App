const  jwt  = require('jsonwebtoken');
const pool = require('../utils/db.js');
const {promisify} = require('util')
const multer = require('multer');


exports.addPost = async(req,res)=>{
  try{
    console.log(req.body);
    const token = req.body.token;
    
    if (!token)
      return res.status(401).json({status:"fail", message:"Not Authentcaited1"});
    
    const userInfo =  await promisify(jwt.verify)(token,"SECERT") ;
    const user_id = userInfo.id;
    console.log(user_id);
    const {title, content, cat, img} = req.body;
    
    const insertQuery = 
    `INSERT INTO posts (title, content, cat, img, user_id) VALUES (?, ?, ?, ?, ?)`;

    const result = await pool.execute(insertQuery,[title,content,cat,img,user_id]);
    console.log(result);
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

    let q = "SELECT * FROM posts ORDER BY created_at DESC"; // Default query
    
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

exports.deletePost = async(req,res)=>{
  try{ 

    const token = req.body.token;
   
    if (!token)
      return res.status(401).json({status:"fail", message:"Not Authentcaited2"});
    
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
    console.log(req.body);
    const token = req.body.token;
    if (!token)
      return res.status(401).json({status:"fail", message:"Not Authentcaited"});
    
    const userInfo =  await promisify(jwt.verify)(token,"SECERT") ;
    

    const {title, content, cat, img} = req.body;

    const q = `UPDATE posts 
    SET title=?, content = ? , cat = ?, img = ?
    WHERE post_id = ? and user_id = ?`
    const result = await pool.execute(q,[title, content, cat, img, req.params.id,userInfo.id]) ; 
    console.log(result);
    if(!result[0].affectedRows)
      return res.status(500).json({status:"fail",message:"there are a problem, try again later"})
    res.status(200).json({status:"success",message:"Post has been updated!"})
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}

exports.getImg=async(req,res)=>{
  try{
     // Assuming the image filename is passed as a parameter
    const imageName = req.params.imageName;
    
     // Construct the URL for the image using the 'images' route
    const imageUrl = `../public/uploads/${imageName}`;
    
    res.status(200).json({ status: 'success', imageUrl });
  }catch(err){
    console.log(err);
  }
}


const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null,'../client/public/uploads')
  },
  filename:function(req,file,cb){
    cb(null, Date.now()+file.originalname)
  }
})

const upload = multer({storage})

exports.handleFileUpload=(req, res)=> {
  upload.single('file')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      return res.status(400).json({ status: 'error', message: err.message });
    } else if (err) {
      // An unknown error occurred.
      return res.status(500).json({ status: 'error', message: 'File upload failed.' });
    }

    // File upload was successful.
    const file = req.file;
    res.status(200).json({ status: 'success', filename: file.filename });
  });
}

const pool = require('../utils/db.js')
exports.getAllPosts = async(req,res)=>{
  try{
    const q = "SELECT * FROM posts"
    // await pool
    // create posts on database!
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
exports.addPost=async(req,res)=>{
  try{
    res.status(200).json("Con")
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
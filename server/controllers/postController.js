
exports.addPost=async(req,res)=>{
  try{
    res.status(200).json("Con")
  }catch(err){
    console.log(err,'💥');
    res.status(500).json(err)
  }
}
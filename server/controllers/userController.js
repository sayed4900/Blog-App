const pool = require('../utils/db')

exports.getUserData=async(req,res)=>{
  
  try{
    const user_id = req.params.id ;
    const q = `
    SELECT u.username, p.*
    FROM users u
    LEFT JOIN posts p ON u.user_id = p.user_id 
    WHERE u.user_id = ?;
  `;
  const [result] = await pool.execute(q,[user_id])
  const username =  result[0].username 
  res.status(200).json({ status:"success",result:result.length,username, data:result })
  }catch(err){
    console.log(err);
  }
  
}

exports.addFollower=async(req,res)=>{
  try{
    const q =`
      INSERT INTO followers (follower_user_id, following_user_id) VALUES (?, ?);
    `
    const [result] = await pool.execute(q,[req.body.follower_user_id, req.body.following_user_id])
    console.log(result);
    res.status(201).json({status:"success", result})
  }catch(err){
    console.log(err);
    res.status(500).json({status:"fail",err})
  }
}
exports.unfollow=async(req,res)=>{
  try{
    const q = `
    DELETE FROM followers 
    WHERE follower_user_id = ? AND following_user_id = ?;
    `
    const [result] = await pool.execute(q,[req.body.follower_user_id, req.body.following_user_id])
    console.log(result);
    res.status(200).json({status:"success", result})
  }catch(err){
    console.log(err);
    res.status(500).json({status:"fail",err})
  }
}

exports.checkFollowStatus =async(req,res)=>{
  try{
    const q = `
    SELECT COUNT(*) AS is_following
    FROM followers 
    WHERE follower_user_id = ? AND following_user_id = ?;
    `
    const [result] = await pool.execute(q,[req.body.follower_user_id, req.body.following_user_id])
    const isFollowing = result[0].is_following
    res.status(200).json({status:"success", isFollowing})
  }catch(err){
    console.log(err);
    res.status(500).json({status:"fail",err})
  }
}

// exports.getCountUserFollowers=async(req,res)=>{
//   try{
//     const q = `
//       SELECT COUNT(*) AS num_following
//       FROM followers
//       WHERE following_user_id = ?
//     `
//     const [result] = await pool.execute(q,[req.params.id])
//     res.status(200).json({status:"success",numberOfFollowers:result[0].num_following})
//   }catch(err){
//     console.log(err);
//     res.status(500).json({status:"fail",err})

//   }
// }

exports.getUserFollowers = async(req,res)=>{
  try{
    const q = `
      SELECT u.username,u.user_id
      FROM users AS u
      JOIN followers AS f ON u.user_id = f.follower_user_id
      WHERE f.following_user_id = ?
    `
    const [result] = await pool.execute(q,[req.params.id])
    res.status(200).json({status:"success",numberOfFollowers:result.length,result})
  }catch(err){
    console.log(err);
    res.status(500).json({status:"fail",err})

  }
}


const pool = require('../utils/db');



exports.createNotification=async(req, res)=>{
  try{
    // I will hard coded the message now
    
    const {sender, receiver, post_id } = req.body ;
    const userQuery = `SELECT * from users where user_id = ?`
    const [user] = await pool.execute(userQuery,[sender])
    console.log(user);
    const message = `a new post created by ${user[0].username}`;

    const q = `INSERT INTO notifications (sender, receiver, post_id, message) VALUES (?, ?, ?, ?) `;
    const [result] = await pool.execute(q,[sender,receiver,post_id,message]);

    res.status(201).json({status:"success",message})
  }catch(err){
    console.log(err)
    res.status(500).json({status:"fail",err})
  }
}

exports.getNotifications=async(req, res)=>{
  try{
    
    const {user_id } = req.params ;
    
    const q = `
      SELECT * FROM notifications
      WHERE receiver = ?
    `
    
    const [notifications] = await pool.execute(q,[user_id]);

    res.status(201).json({status:"success",notifications})
  }catch(err){
    console.log(err)
    res.status(500).json({status:"fail",err})
  }
}


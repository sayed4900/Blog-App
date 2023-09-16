const pool = require('../utils/db');

exports.createNotification = async (sender, receiver, post_id) => {
  try {
    console.log(`sender is ${sender}, receiver: ${receiver}, post_id: ${post_id}`)
    const userQuery = `SELECT * FROM users WHERE user_id = ?`;
    const [user] = await pool.execute(userQuery, [sender]);
    const message = `A new post created by ${user[0].username}`;

    const q = `INSERT INTO notifications (sender, receiver, post_id, message) VALUES (?, ?, ?, ?)`;
    const [result] = await pool.execute(q, [sender, receiver, post_id, message]);

    return result;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

exports.getNotifications=async(req, res)=>{
  try{
    
    const {user_id } = req.params ;
    const q = `
      SELECT * FROM notifications
      WHERE receiver = ?
      ORDER BY notification_id DESC
    `
    const [notifications] = await pool.execute(q,[user_id]);
    res.status(201).json({status:"success",notifications})
  }catch(err){
    console.log(err)
    res.status(500).json({status:"fail",err})
  }
}


const pool  = require('../utils/db.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async(req,res)=>{
  const d_img="default-user.png";
  try{
    // CHECK exist user
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"

    const [user] = await pool.execute(q,[req.body.email,req.body.username])
    // console.log(user);
    if (user.length > 0)
      return res.status(409).json({ status: "fail ", message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password,salt);

    const q2 = "INSERT INTO users(`username`,`email`, `password`, `img`) VALUES (?, ?, ?, ?)";
    const values = [req.body.username, req.body.email, hash, d_img ] ;

    await pool.execute(q2, values);

    const [registeredUser] = await pool.execute("SELECT * FROM users WHERE email = ?", [req.body.email]);

    

    res.status(201).json({status:"success",user:registeredUser})

  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
}

exports.login=async(req,res)=>{
  try{
    if (!req.body.username || !req.body.password)
      return res.status(404).json({status:"fail",message:"Please provide username and Password"})
    // get the user
    const q = "SELECT * FROM users WHERE username = ?";
    const [user] = await pool.execute(q, [req.body.username]);
    
    if (!user.length)
      return res.status(401).json({status:"fail",message:"Wrong username"})

    const passwordMatch  = await bcrypt.compare(req.body.password,user[0].password);

    if (!passwordMatch )
      return res.status(401).json({status:"fail",message:"Incorrect password"})

    const token = jwt.sign({id:user[0].user_id},"SECERT")
    
    
    const {password, ...other} = user[0];
    // res.writeHead(200, {
    //   "Set-Cookie": `access_token=${token}`,
    //   "Content-Type": `text/plain`
    // });
    res.cookie("access_token", token,{httpOnly:false});

    res.status(200).json({status:"success",user:other})

  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
}

exports.logout=async(req,res)=>{
  try{
    console.log(req.cookies)
    console.log(req.cookies?.access_token)
    res.clearCookie("access_token",{
      sameSite:"none",
      secure:true
    }).status(200).json({status:"success",message:"User has been logged out"})
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
}

exports.getAllUsers = async(req,res)=>{
  try{
    const q = "SELECT * from users"

    const [users] = await pool.execute(q);
    res.status(200).json({ status: "success", data: users });
  }catch(err){
    console.log(err);
    res.status(500).json(err)
  }
}
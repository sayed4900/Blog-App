const express = require('express');
const cors = require('cors');

const app = express();


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cors());

const server = require('http').createServer(app)

const io = require('socket.io')(server,{
  cors:{
    // origin:'http://localhost:5713',
    origin:'*',
    // methods:['GET', 'POST'] 
  }
});



const cookieParser = require('cookie-parser'); 

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

io.on('connection', (socket) => {
  console.log('A user connected with ' + socket.id); // This line should be here to log when a user connects


  socket.on("newUser",userId=>{
    socket.join(userId);
    console.log('userId join to '+userId);
  })
  socket.on('newPost', async (data) => {
    const { user_id, post_id , followers} = data;

    // socket.emit("newNotification",`new post with id: ${post_id}`);

    followers.forEach((followerId) => {
      // socket.join(followerId);
      console.log('*****');
      console.log(followerId.follower_user_id);
      io.to(followerId.follower_user_id).emit("sendNotifaction","new post created with")
    });
  

  });

  socket.on('disconnect', () => {
    console.log('A user disconnected.');
    socket.leave(socket.id);
  });
});


app.use(cookieParser())




app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use('/posts',postRoutes);

server.listen(5000,()=>{
  console.log("Connected!");
})
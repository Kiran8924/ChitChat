const http = require("http")
const express= require("express")
const cors = require("cors");
const socketIO = require("socket.io");

const app = express();
const port = 8000 || process.env.PORT;

const users=[{}];
app.use(cors());

app.get("/",(req,res)=>{
    res.send("working working")
})



// const io = require('socket.io')();

// io.on('connection', (socket) => {
//   // Access the socket ID
//   const socketId = socket.id;
//   console.log(`New client connected with ID: ${socketId}`);

//   // Rest of your socket event handlers and logic
// });


const server = http.createServer(app);
const io = socketIO(server);

// io.on("connection",(socket)=>{
//     console.log("new connection");

//     socket.on('joined',({user})=>{
//         users[socket.id] = user;
//         console.log(`${user} has joined`);

//          socket.broadcast.emit('userJoined',{user:"Admin",message:`${users[socket.id]}User has Joined`})
//           socket.emit('welcome',{user:"Admin", message:`welcome to the chat,${users[socket.id]}`})

//     })


     // Assuming you have a users object to store user details.

io.on("connection", (socket) => {
  console.log("new connection");

  socket.on('joined', ({ user }) => {
    users[socket.id] = user;
    console.log(`${user} has joined with socket ID: ${socket.id}`);

    socket.broadcast.emit('userJoined', { user: "Admin", message: `${users[socket.id]}User has Joined` });
    socket.emit('welcome', { user: "Admin", message: `welcome to the chat, ${users[socket.id]}` });
  });

  // Rest of your socket.io event listeners and logic.





    socket.on('message',({message,id})=>{
       io.emit('sendMessage',{user:users[id],message})
    })
   socket.on('disconnectt',()=>{
    socket.broadcast.emit('leave',{user:"Admin",message:`${users[socket.id]}  has left`});
    console.log('user left');
   })
   
});

// const io = socketIO(server);


server.listen(port,()=>{
    console.log(`server is working on ${port}`);
})
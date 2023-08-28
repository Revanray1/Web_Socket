// require("dotenv").config();
// const express = require("express");
// const app = express();
// const os = require("os");
// const port = process.env.PORT || 4000;
// const { Server } = require("socket.io");
// const cors = require("cors");
// const http = require("http");

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// // app.get("/os", (req, res) => {
// //   res.send(os.type());
// // });

// io.on("connection", (socket) => {
//   console.log(socket.id);
// });

// // Allocating os moduleconst   // Printing os.type() valueconsole.log(os.type());
// server.listen(port, () => {
//   console.log(`Connected to :- ${port}`);
// });


// Another Method

const io=require("socket.io")(4000,{
      cors: {
    origin: "https://heroic-torte-12cce8.netlify.app",
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("sendMessage",(data)=>{
    console.log("data:",data);
    socket.broadcast.emit("sendReply",{reply:data.message})
  })

  
});


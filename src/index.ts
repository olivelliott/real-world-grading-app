import { PrismaClient } from '@prisma/client'
const express = require('express');
const http = require("http");
import {Server} from "socket.io";
import cors from "cors";

// // routes
// import authRoutes from "./routes/auth";
// import contactRoutes from "./routes/contact";
// import conversationRoutes from "./routes/conversation";
// import WebSocket from "./controllers/socket";

const app = express()
const port = process.env.PORT || "3000";
const server = http.createServer(app);
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({extended: false}));
// app.use("/api", [authRoutes, contactRoutes, conversationRoutes]);
app.get('/', (req: any, res:any) => {
    res.send('<h1>hello world</h1>')
})


const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });

  // io.on('connection', (socket) => {
  //   socket.send(console.log('hello world'));
  // })

//   io.on("connection", (socket) => {
//     const webSocket = new WebSocket(socket, prisma);
//     const myId = socket.handshake.query.userId;
//     webSocket.connection(myId);
  
//     socket.on("login", (userId: string) => webSocket.login(userId));
//     socket.on("logout", (userId: string) => webSocket.logout(userId));
//     socket.on("message", ({message, conversation, myUserId}) =>
//       webSocket.message(message, conversation, myUserId)
//     );
//     socket.on("disconnect", (reason) => webSocket.disconnect(reason, myId));
//     socket.on("conversationChange", ({conversationId, myUserId}) =>
//       webSocket.conversationChange(conversationId, myUserId)
//     );
//   });


app.listen(3000, () =>
  console.log(`Listening on port http://localhost:${port} 🌟`),
)
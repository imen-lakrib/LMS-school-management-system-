import { Server as socketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
  const io = new socketIOServer(server);

  //   1-first user connected user ask questio

  io.on("connection", (socket) => {
    console.log("connection socket io");

    // Listen for 'notification' event from the frontend
    // Add it to data
    socket.on("notification", (data) => {
      // Brodcast the notification data to all connected clients (admin dashboard) so all admins connected
      socket.emit("newNotification", data);
    });

    //when the user leaves the website
    socket.on("discounnect", ()=>{
        console.log("user disconnected");

    })
  });
};

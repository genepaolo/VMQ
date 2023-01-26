/**
 * Info:
 * To run the server type command: node app.js
 */

const express = require('express');
const app = express(); //Connects to our backend API's
const http = require('http');
const cors = require("cors");
const path = require('path')
const server = http.createServer(app); //What the user connects to
const socketIO = require('socket.io');
const port = process.env.PORT || 5000;  // If default port for React is 3000, so we made it 5000
let whitelist = ['http://localhost:3000'];
// I'll add these in a bit
//const mongoose = require('mongoose');
//const bodyParser = require('body-parser');
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: '*',
  }
});

const corsOptions = {
    origin: function (origin, callback) {
  
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  };
app.use(cors(corsOptions));


// Server listens for users that connect here
server.listen(port, () => {
    console.log(`Server listening at http://localhost:${ port }`);
});

//To run the server type command: node app.js
//To run server with auto refresh (for debugging): nodemon app.js
//If you quit server and want to run it again, make sure you delete the instance running on your port
// kill -9 $(lsof -t -i:5000)
const _sessions = {};
/**
 * _sessions = {
 *  id: {game info}
 * }
 * 
 * game info ={
 *  sessionId - Integer, same as earlier
 *  hostId - Integer
 *  hostName - String
 *  playerCount - Short
 *  isSolo - Boolean
 *  questions - [list of VTuber videos in json form]
 *  questionNumbers - 
 * 
 * }
 */

io.on('connection', (socket) => {
    /**
     * Works for both multiplayer and solo
     * hostMame: Host name (string)
     * hostId: hostId (integer)
     * isSolo: if solo/multiplayer (boolean)
     */
    socket.on("HOST_JOINED", ({hostName, hostId, isSolo}) => {
        
        
        let sessionId = Math.floor(Math.random()*90000000) + 10000000;
        //console.log(sessionId, hostName, hostId, isSolo); // temp
        // Now we can emit back to host
        socket.join(sessionId);
        socket.emit("start_lobby", {sessionId: sessionId, isSolo: isSolo});
        
    });

    socket.on("HOST_START", (lobby) => {
        console.log(lobby);
        socket.emit("start_game", {});
    });

    socket.on("disconnect", () =>{
        console.log("Goodbye");
        // Should handle removing from game/disconnections/reconnections
        /**
         * Reconnections handled on App.js, disconnect/reconnect
         */
    })

    // Used to test out reconnection
    // console.log(`Client ${socket.id} is connected: ${socket.connected}`);
    

    socket.on("reconnect_attempt", ()=>{
      console.log("Client trying to reconnect")
    })

    socket.on('reconnect_error', (error) => {
      console.log('Client reconnection error:', error);
  });

    socket.on('reconnect_failed', () => {
      console.log('Client reconnection failed:', socket.id);
  });
}) 
const express = require("express");
const http = require('http');
const socketIo = require('socket.io');
const path = require("path");

const PORT = process.env.PORT || 3001;

const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use(routes);

// Send every other request to the React app
// Any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


const server = http.createServer(app);
const io = socketIo(server);


// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

io.on("connection", socket => {
  //broadcast msg when a book is saved
  socket.on("save_book", msg => {
    io.emit("save_book", msg);
  });
});

server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
  
  
});

const path = require("path");
const PORT = process.env.PORT || 3001;
const routes = require("./routes");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const http = require('http');
const socketIO = require('socket.io');
const cors = require("cors");

app.use(cors());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// API routes
app.use(routes);

const server = http.createServer(app);
const io = socketIO(server);

// socket
io.on("connect", socket => {
  //broadcast msg when a book is saved
  socket.on("save_book", msg => {
    io.emit("book_saved", msg);
  });
});


// Send every other request to the React app
// Any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks");

server.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});





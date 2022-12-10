// server-side JS code
const cors = require("cors");
const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const path = require("path");
const socketio = require("socket.io");

// ideally this uri would be put in a .env file, along with the PORT var (more secure if they aren't visible and pushed
// to our repo), but this works for now
const MONGODB_URI = "mongodb+srv://db-user:db-pass@cluster0.ofuaylx.mongodb.net/go_groceries?retryWrites=true&w=majority";

// in development: the port will always be 3000.
// in production: if we host the app on some service (e.g., AWS), the host may independently
// configure process.env.PORT, so we should use that configured port in that case.
const PORT = process.env.PORT || 3000;

// create express app
const app = express();
// create server with the express app
const server = http.createServer(app);
// pass the server into socket.io, export the socket.io server to other modules
const io = exports.io = socketio(server, {
    cors: {
        origin: "*"
    }
});

// set the static folder -- the folder that the server serves to the client
// we are setting it to the `public` folder since this contains all the client-side code we want to serve to the client.
app.use(express.static(path.join(__dirname, "../client/public")));

// configure the app to parse incoming JSON requests & put the parsed data in req.body
app.use(express.json());
// configure app to use cors middleware
app.use(cors());
// open a connection to our mongodb cluster
mongoose.connect(MONGODB_URI);

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Successfully established connection to MongoDB cluster");
});

// add users route
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

// start the server
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

// handle a socket connection request from web client
// note: `socket` param is the client that has connected
io.on("connection", (socket) => {
    console.log("New web socket connection");
});

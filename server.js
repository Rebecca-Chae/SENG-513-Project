const express = require("express");
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

// in development: the port will always be 3000.
// in production: if we host the app on some service (e.g., AWS), the host may independently
// configure process.env.PORT, so we should use that configured port in that case.
const PORT = process.env.PORT || 3000;

// create express app
const app = express();
// create server with the express app
const server = http.createServer(app);
// pass the server into socket.io
const io = socketio(server);

// set the static folder -- the folder that the server serves to the client
// we are setting it to the `public` folder since this contains all the client-side code.
app.use(express.static(path.join(__dirname, "public")));

// start the server
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const forgetRoutes = require("./routes/forget");
const resetRoutes = require("./routes/reset");
const songRoutes = require("./routes/songs");
const playListRoutes = require("./routes/playLists");
const searchRoutes = require("./routes/search");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const facebooklogin = require("./routes/facebooklogin");
const lyricsFinder = require("lyrics-finder");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const { OAuth2Client } = require("google-auth-library");

const app = express();
var bodyParser = require("body-parser");
const client = new OAuth2Client(
  "671697475830-un4oqehgrhenbc78jmlaogjs1gmilbvn.apps.googleusercontent.com"
);
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const users = [];
function upsert(array, item) {
  const i = array.findIndex((_item) => _item.email === item.email);
  if (i > -1) array[i] = item;
  else array.push(item);
}
app.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience:
      "671697475830-un4oqehgrhenbc78jmlaogjs1gmilbvn.apps.googleusercontent.com",
  });

  const { email } = ticket.getPayload();
  upsert(users, { email });
  res.status(201);
  res.json({ email, password: "aA123456!" });
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
});
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
connection();

app.use(errorHandler);
app.use("/api/chat", chatRoutes);
app.use("/api/mm", messageRoutes);
app.use("/api/users/", userRoutes);
app.use("/api/login/", authRoutes);
app.use("/api/songs/", songRoutes);
app.get("/api/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.title)) ||
    "No Lyrics Found";
  res.json({ lyrics });
});
app.use("/api/playlists/", playListRoutes);
app.use("/api/", searchRoutes);
app.use("/api/", facebooklogin);
app.use("/api/fr", forgetRoutes);
app.use("/api/fr", resetRoutes);

const port = process.env.PORT || 5000;

app.use(errorHandler);
app.use(notFound);

const server = app.listen(
  port,
  console.log(`Server running on PORT ${port}...`)
);
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
    // credentials: true,
  },
  allowEIO4: true,
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

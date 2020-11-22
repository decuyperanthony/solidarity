const https = require('https');
const http = require('http');
const fs = require('fs');
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const sanitizeMiddleware = require('./app/middlewares/sanitise');

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;
const app = express();

//! fonctionne mais new test plus bas
// //prod
// const Server = require('https').Server;
// //http normal
// // const Server = require('http').Server;
// const socket = require('socket.io');

// const server = Server(app);
// const io = socket(server);
//! --------------
const socket = require('socket.io');

// var server = https.createServer(app);



// === config prod et local
if (process.env.NODE_ENV === 'production') {

  console.log('prod')
  const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/solidarity.website/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/solidarity.website/fullchain.pem'),
  }, app);

  //! test
  var io = socket(httpsServer);
  //!

  httpsServer.listen(PORT, () => {
      console.log('HTTPS Server running on port :', PORT);
});
} else {
    console.log('bonjour dev');

  const httpsServer = https.createServer({
      key: fs.readFileSync('localhost.key'),
      cert: fs.readFileSync('localhost.crt'),
  }, app);

  //! test
  var io = socket(httpsServer);
  //!

  // let PORT = 6060;

  httpsServer.listen(PORT, () => {
        console.log('HTTPs Server local running on port ' + PORT);
  });
}




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
 });

 const dataMapper = require('./app/dataMapper');

 const formatMessage = require('./app/utils/messages');
 const {
   userJoin,
   getCurrentUser,
   userLeave,
   getRoomUsers
 } = require('./app/utils/users');

 const botName = 'Robot'

io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room}) => {

    const userId = username.id;
    const user = userJoin(socket.id, username.nickname, userId, room);
    console.log('user', user);

    socket.join(user.room);
    console.log('Bienvenue dans le chat');
    socket.emit('message',formatMessage(botName, `Welcome to the Chat ! ${room}`));
    socket.broadcast
    .to(user.room)
    .emit(
      'message',
      formatMessage(botName, `${user.username} has joined the chat`)
      );

    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  socket.on('chatMessage', msg => {
    console.log('msg', msg)
    const user = getCurrentUser(socket.id);
    console.log(user)
    if (!user) {
      console.log('ça ne plante plus');
      return console.log('User Room Vide');
    }
    io.to(user.room).emit('message', formatMessage(user.username, msg.content));
    console.log('msg.content', msg.content);
        dataMapper.putMsgOnDb(msg.content, user.userId, user.room, (error, data) => {
        if (error) {
        console.trace(error);
        res.send(error);
        }
        });
  });

  socket.on('disconnect', () => {
    const user = userLeave(socket.id);
    console.log('user has left the channel');
    if (user) {
      io.to(user.room).emit(
        'message',
           formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
      });
    }
  });
});

// == config cors
app.use(bodyParser.json()); // => req.body va contenir le JSON de la req
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS, PUT, DELETE');
    if (req.method === "OPTIONS") {
        return res.status(200).send("OK");
    }
    next();
  });

  app.use(express.urlencoded({extended:true}));
  // Req.body existe Du coup =>
  app.use(sanitizeMiddleware);

const router = require('./app/router');

app.use(session({
    secret: 'je suis la phrase du site solidarité',
    resave: true,
    saveUninitialized:true,
    cookie: {
        secure: false,
        maxAge: (1000*60*60)
    }
}));

app.use(router);

// if (process.env.NODE_ENV = 'dev') {
//   console.log('bonjour dev');
//   server.listen(PORT, () => {
//     console.log(`Listening on PORT: ${PORT}`);
//   });

// }




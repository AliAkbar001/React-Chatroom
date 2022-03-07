const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const http = require('http').createServer(app)
const socketIo = require('socket.io')
const { addUser, getUser, removeUser } = require('./helper')
const io = socketIo(http)
const mongoose = require('mongoose')
const {Room, Message} = require('./model')
const router = require('./routes/authRoutes')
const mongoDB = 'mongodb+srv://ali:ali7676@cluster0.ozphx.mongodb.net/chatroom?retryWrites=true&w=majority'
const PORT = process.env.PORT || 4000

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.json())
app.use(router)
mongoose.connect(mongoDB).then(()=>console.log("Database Connected")).catch(error=>console.log(error))
  
app.get('/set-cookies',(req,res)=>{
    res.cookie('username','Ali')
    res.cookie('isAuthenticated',true)
    res.send('cookies are set')
})
app.get('/get-cookies',(req,res)=>{
    const cookies = req.cookies;
    console.log(cookies)
    res.json(cookies)
})
io.on('connection', (socket) =>{
    console.log('Socket ID : ', socket.id)
    Room.find().then(result =>{
        io.emit('output-rooms', result)
    })
    socket.on('create-room', name =>{
        const room = new Room({name})
        room.save().then(result =>{
            io.emit('room-created', result)
        })
    })
    socket.on('join', ({name, room_id, user_id}) => {
        const { error, user } = addUser({ socket_id:socket.id, name, room_id, user_id })
        if(error){
            console.log('Join Error : ', error)
        }else{
            //console.log('User Join : ', user)
        }
    }) 
    socket.on('sendMessage',(message,room_id,callback)=>{
        const user = getUser(socket.id)
        const msgToStore = {
            name:user.name,
            user_id:user.user_id,
            room_id,
            text:message
        }
       // socket.join(room_id)
        console.log('Message', msgToStore)
        const msg = new Message(msgToStore)
        msg.save().then(result=>{
            io.to(room_id).emit('message',result);
            callback()
        })
    })
    socket.on('get-messages-history', room_id => {
        Message.find({ room_id }).then(result => {
            io.emit('output-messages', result)
        })
    })
    socket.on('disconnect',()=>{
        const user = removeUser(socket.io)
        //console.log('Remove User : ', user)
    })
})

http.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})
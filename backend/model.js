const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const {isEmail} = require('validator')
const roomSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    }
})
const Room = mongoose.model('room', roomSchema)

const messageSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },user_id:{
        type: String,
        required: true
    },text:{
        type: String,
        required: true
    },room_id:{
        type: String,
        required: true
    }
},{timestamps:true})
const Message = mongoose.model('message', messageSchema)

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },email:{
        type: String,
        required: [true, 'Email is required'],
        unique:true,
        lowercase: true,
        validate: [isEmail, 'Invalid Email']
    },password:{
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password should be at least 6 characters long']
    }
},{timestamps:true})
userSchema.pre('save', async function (next){
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
  //  console.log('Before Save', this)
    next()
})
userSchema.statics.login = async function (email,password){
    const user = await this.findOne({email})
    if(user){
        const authentication = await bcrypt.compare(password, user.password)
        if(authentication){
            return user;
        }else{
            throw Error('Incorrect Password')
        }
    }else{
        throw Error('Incorrect Email')
    }
}
// userSchema.post('save', function (doc,next){
//     console.log('After Save', this)
//     next()
// })
const User = mongoose.model('user', userSchema)

module.exports = {Room, Message, User}
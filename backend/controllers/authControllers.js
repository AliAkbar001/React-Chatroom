const { User } = require("../model")
const jwt = require('jsonwebtoken')
const tokenExpiry = 5*24*60*60
const createJWT = id => {
    return jwt.sign({id},'chatroom secret',{
        expiresIn: tokenExpiry
    })
}
const alertError = (err) =>{
    let errors = {name:'',email:'',password:''}
    console.log(err.message)
    console.log(err.ode)
    if(err.code === 11000){
        errors.email = "Email already in use."
    }
    
    if(err.message === 'Incorrect Email'){
        errors.email = "Incorrect Email."
    }
    if(err.message === 'Incorrect Password'){
        errors.password = "Incorrect Password."
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}   
const signup = async (req, res) => {
    try{
        const user = await User.create(req.body)
        const token = createJWT(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: tokenExpiry * 1000})
        res.status(201).json({status:201,user})
    } catch(error){
        let errors =  alertError(error)
        res.status(400).json({status:400,errors})
    }
}
const login = async (req, res) => {
    try{
        const user = await User.login(req.body.email,req.body.password)
        const token = createJWT(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: tokenExpiry * 1000})
        res.status(201).json({status:201,user})
    } catch(error){
        let errors =  alertError(error)
        res.status(400).json({status:400,errors})
    }
}
const verifyUser = (req,res,next)=>{
const token = req.cookies.jwt;
if(token){
    jwt.verify(token,'chatroom secret', async(err,decodedToken)=>{
        console.log('decoded token', decodedToken)
        if(err){
            console.log(err.message)
        }else{
            let user = await User.findById(decodedToken.id)
            res.json(user)
            next()
        }
    })
}else{
    next()
}
}
const logout = (req, res) => {
    res.cookie('jwt','',{maxAge:1})
    res.status(200).json({logout:true})
}
module.exports = {signup, login, logout, verifyUser}
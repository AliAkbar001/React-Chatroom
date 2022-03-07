const { User } = require("../model")
const jwt = require('jsonwebtoken')
const alertError = (err) =>{
    let errors = {name:'',email:'',password:''}
    // console.log('Error Message ',err.message)
    // console.log('Error Code ',err.code)
    // console.log('Error ',err)
    if(err.code === 11000){
        errors.email = "Email already in use."
    }
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors;
}   
const signup = async (req, res) => {
    console.log("Signup Body", req.body)
    try{
        const user = await User.create(req.body)
        res.status(201).json({status:201,user})
    } catch(error){
        let errors =  alertError(error)
        res.status(400).json({status:400,errors})
    }
}
const login = (req, res) => {
    res.send('login')
}
const logout = (req, res) => {
    res.send('logout')
}
module.exports = {signup, login, logout}
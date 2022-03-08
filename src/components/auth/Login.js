import React, { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import {Navigate} from 'react-router-dom'

const Login = () => {
  const {user, setUser} = useContext(UserContext)
  const [loginFields, setLoginFields] = useState({email:'',password:''})
  const [errors, setErrors] = useState({email:'',password:''})

  const handleChange = (e) =>{
    const value = e.target.value
    const name = e.target.name
    setLoginFields({...loginFields,[name]:value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:4000/login',{
      method:'POST',
      credentials:'include',
      body:JSON.stringify(loginFields),
      headers:{'Content-Type':'application/json'}
      })
      const data = await res.json()
      if(data.status === 400){
        setErrors(data.errors)
      }else{
        alert(JSON.stringify(data.user))
        setLoginFields({email:'',password:''})
        setErrors({email:'',password:''})
        setUser(data.user)
      }
    }catch(error){
      alert(error)
    }
  }
  if(user){
    return <Navigate to='/' replace={true}/>
  }
  return (
    <div>
        <h1>LOGIN</h1>
        <form style={{padding:'20px'}} onSubmit={handleSubmit}>
            <input type='email' name='email' placeholder='Email' value={loginFields.email} onChange={handleChange}/>
            <h6 className='red-text' style={{marginBottom:'20px', textAlign:'left'}}>{errors.email}</h6>

            <input type='password' name='password' placeholder='Password' value={loginFields.password} onChange={handleChange}/>
            <h6 className='red-text' style={{marginBottom:'20px', textAlign:'left'}}>{errors.password}</h6>
            <button className='btn'>Submit</button>
        </form>
    </div>
  )
}

export default Login
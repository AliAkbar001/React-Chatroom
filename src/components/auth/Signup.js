import React,{useState} from 'react'

const Signup = () => {

  const [signupFields, setSignupFields] = useState({name:'',email:'',password:''})
  const [errors, setErrors] = useState({name:'',email:'',password:''})

  const handleChange = (e) =>{
    const value = e.target.value
    const name = e.target.name
    setSignupFields({...signupFields,[name]:value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const res = await fetch('http://localhost:4000/signup',{
      method:'POST',
      credentials:'include',
      body:JSON.stringify(signupFields),
      headers:{'Content-Type':'application/json'}
      })
      const data = await res.json()
      if(data.status === 400){
        setErrors(data.errors)
      }else{
        alert(JSON.stringify(data))
        setSignupFields({name:'',email:'',password:''})
        setErrors({name:'',email:'',password:''})
      }
    }catch(error){
      alert(error)
    }
  }
  return (
    <div>
        <h1>Signup</h1>
        <form style={{padding:'20px'}} onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Name' value={signupFields.name} onChange={handleChange}/>
            <h6 className='red-text' style={{marginBottom:'20px', textAlign:'left'}}>{errors.name}</h6>

            <input type='email' name='email' placeholder='Email' value={signupFields.email} onChange={handleChange}/>
            <h6 className='red-text' style={{marginBottom:'20px', textAlign:'left'}}>{errors.email}</h6>

            <input type='password' name='password' placeholder='Password' value={signupFields.password} onChange={handleChange}/>
            <h6 className='red-text' style={{marginBottom:'20px', textAlign:'left'}}>{errors.password}</h6>
            <button className='btn'>Submit</button>
        </form>
    </div>
  )
}

export default Signup
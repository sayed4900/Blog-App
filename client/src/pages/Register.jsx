import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {baseUrl} from '../utils/service'


const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  })
  const [error, setError] = useState(null)

  const navigate = useNavigate();


  const handleChange = e =>{
 
    console.log('➡️',e.target.name,e.target.value);
    setInputs(prev=>({...prev, [e.target.name]:e.target.value}))
  }
  const handleSubmit = async e=>{
    e.preventDefault();
    try{

      const res = await axios.post(`${baseUrl}/auth/register`,inputs);
      // console.log(res);
      if (res.data.status==="success"){
        navigate('/login')
      }
      else{
        setError(res.data.message);
      }
    }catch(err){
      console.error(err.response.data);
      setError(err.response.data.message);
    }
  }
  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name="username" required onChange={handleChange}/>
        <input type="email" placeholder="email" name="email" required onChange={handleChange} />
        <input type="password" placeholder="password" name="password" required onChange={handleChange} />
        <button>Register</button>
        {error&&<p>{error}</p>}
        <span>Have an account? <Link to= "/Login" >Login</Link></span>
      </form>
    </div>
  )
}

export default Register;
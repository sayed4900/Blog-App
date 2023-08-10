import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import {baseUrl} from '../utils/service'


const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
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

      const res = await axios.post(`${baseUrl}/auth/login`,inputs);
      console.log(`➡️   ${res.data}`);
      if (res.data.status === "success"){
        navigate('/')
      }
      else{
        setError(res.data.message);
      }
    }catch(err){
      console.error(err);
      // setError(err);
    }
  }

  return (
    <div className="auth">
      <h1>login</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" name="username" required onChange={handleChange}/>
        <input type="password" placeholder="password" name="password" required onChange={handleChange} />
        <button>login</button>
        {error&&<p>{error}</p>}
        <span>Don't have an account? <Link to= "/Register" >Register</Link></span>
      </form>
    </div>
  )
}

export default Login;
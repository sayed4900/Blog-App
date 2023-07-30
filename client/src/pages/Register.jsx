import { Link } from "react-router-dom";


const Register = () => {
  return (
    <div className="auth">
      <h1>Register</h1>
      <form action="">
        <input type="text" placeholder="username" required />
        <input type="text" placeholder="email" required/>
        <input type="password" placeholder="password" required/>
        <button>Register</button>
        <p>There is an error</p>
        <span>Have an account? <Link to= "/Login" >Login</Link></span>
      </form>
    </div>
  )
}

export default Register;
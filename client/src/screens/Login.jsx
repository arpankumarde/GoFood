import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [cred, setCred] = useState({
    email: "",
    pass: "",
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/loginuser', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        email: cred.email,
        pass: cred.pass,
      })
    });
    const databack = await response.json();
    if (!databack.success) {
      alert("Enter valid credentials!")
    } else {
      localStorage.setItem('userEmail', cred.email)
      localStorage.setItem('authToken', databack.authToken)
      navigate('/')
    }

  }

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' value={cred.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='pass' value={cred.pass} onChange={handleChange} className="form-control" id="exampleInputPassword1" required />
          </div>
          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to='/signup' className='m-3 btn btn-danger'>New user?</Link>
        </form>
      </div>
    </>
  )
}

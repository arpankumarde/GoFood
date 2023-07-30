import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../components';

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
    const response = await fetch(`${import.meta.env.VITE_SERVER}/api/loginuser`, {
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
      <Navbar />
      <div className="container mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' value={cred.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='pass' value={cred.pass} onChange={handleChange} className="form-control" id="exampleInputPassword1" required />
          </div>
          <button type="submit" className="m-3 ms-0 btn btn-success">Login</button>
          <Link to='/signup' className='m-3 btn btn-danger'>New user?</Link>
        </form>
      </div>
    </>
  )
}

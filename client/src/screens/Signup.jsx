import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components';

export default function Signup() {
    const [cred, setCred] = useState({
        name: "",
        email: "",
        pass: "",
        location: ""
    });

    const handleChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${import.meta.env.VITE_SERVER}/api/createuser`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                name: cred.name,
                email: cred.email,
                pass: cred.pass,
                location: cred.location
            })
        });
        const databack = await response.json();
        console.log(databack);
        if (!databack.success) {
            alert("Enter valid credentials!")
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Name</label>
                        <input type="text" name='name' value={cred.name} onChange={handleChange} minLength={5} required className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' value={cred.email} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='pass' value={cred.pass} onChange={handleChange} className="form-control" id="exampleInputPassword1" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="location" className="form-label">Address</label>
                        <input type="text" name='location' value={cred.location} onChange={handleChange} className="form-control" id="location" required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" defaultChecked required />
                        <label className="form-check-label" htmlFor="exampleCheck1">I agree to the terms and conditions</label>
                    </div>
                    <button type="submit" className="m-3 ms-0 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user?</Link>
                </form>
            </div>
        </>
    )
}

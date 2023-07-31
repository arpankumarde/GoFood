import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Footer, Navbar } from '../components';

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
                        <label htmlFor="username" className="form-label">Full Name</label>
                        <input type="text" name='name' value={cred.name} onChange={handleChange} minLength={5} required className="form-control" id="username" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputEmail" className="form-label">Email address</label>
                        <input type="email" name='email' value={cred.email} onChange={handleChange} className="form-control" id="InputEmail" aria-describedby="emailHelp" required />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputPassword" className="form-label">Password</label>
                        <input type="password" name='pass' value={cred.pass} onChange={handleChange} className="form-control" id="InputPassword" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="InputLocation" className="form-label">Address</label>
                        <input type="text" name='location' value={cred.location} onChange={handleChange} className="form-control" id="InputLocation" required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="inputCheck" defaultChecked required />
                        <label className="form-check-label" htmlFor="inputCheck">I agree to the terms and conditions</label>
                    </div>
                    <div className='d-flex gap-4 mt-4'>
                        <button type='submit' className='btn btn-success'>Submit</button>
                        <Link to='/login' className='btn btn-danger'>Already a user?</Link>
                    </div>
                </form>
            </div>
            <Footer />
        </>
    )
}

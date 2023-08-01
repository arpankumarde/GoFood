import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Modal from '../Modal';
import { Cart } from '../screens';
import { useCart } from './';

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
            </li>

            {(localStorage.getItem('authToken')) ?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/my-orders">My Orders</Link>
              </li>
              : null
            }
          </ul>
          {(!localStorage.getItem('authToken')) ?
            <div className='d-flex gap-3'>
              <Link className="btn bg-white text-success" to="/login">Login</Link>
              <Link className="btn bg-white text-success" to="/signup">Signup</Link>
            </div>
            :
            <div className='d-flex gap-3'>
              <div className="btn bg-white text-success" onClick={() => setCartView(true)}>
                My Cart {" "}
                {data.length ? <span className='bg-danger text-white px-2 py-1 rounded-circle'>{data.length <= 9 ? data.length : '9+'}</span> : null}
              </div>
              {cartView ? <Modal onClose={() => setCartView(false)} ><Cart /></Modal> : null}
              <div className="btn bg-white text-danger" onClick={handleLogout}>
                Logout
              </div>
            </div>
          }
        </div>
      </div>
    </nav>
  )
}

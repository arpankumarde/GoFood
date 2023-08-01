import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 px-4 border-top">
      <div className="d-flex align-items-center">
        <Link to="/" className="mb-3 mb-md-0 text-muted text-decoration-none">
          <span className="text-muted">© 2023 GoFood, Inc</span>
        </Link>
      </div>
      <div className="d-flex align-items-center">
        <Link to="/" className="mb-3 mb-md-0 text-muted text-decoration-none">
          <span className="text-muted">All rights reserved</span>
        </Link>
      </div>
    </footer>
  )
}

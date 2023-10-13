import React from "react";
import { Link,useLocation } from "react-router-dom";

function Navbar() {
  const currentURL=useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNotebook
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse f-flex justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className={`nav-link ${currentURL.pathname==="/"?"active":""}`} aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${currentURL.pathname==="/about"?"active":""}`} to="/about">
                  About
                </Link>
              </li>
            </ul>
            <form className="d-flex gap-3 px-4">
            <Link className="btn btn-primary" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary" to="/signup" role="button">Singup</Link>
            </form>
          </div>
        </div>
      </nav>

    </>
  );
}

export default Navbar;

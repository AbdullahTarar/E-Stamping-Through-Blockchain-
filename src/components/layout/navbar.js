import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./logo.PNG";
import ver from "./ver.PNG";
import "./styles.css";
const Navbar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>
      <ul>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            aria-current="page"
            exact
            to="/WriteStamp"
          >
            Write Stamp
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/issue">
            Wallet Connection
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/verify">
            Verify{" "}
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/license">
            Latest Transactions
          </NavLink>
        </li>
        <li>
          <img className="ver" src={ver} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

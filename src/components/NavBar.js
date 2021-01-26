import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar({ loginMsg, isLoggedIn, user }) {
  let username = isLoggedIn ? `Logged in as: ${user.username}` : "";
  let roles = isLoggedIn ? `Roles: ${user.roles}` : "";

  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="active" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="active" to="/booking">
            Booking
          </NavLink>
        </li>
        {isLoggedIn && (
          <>
            <li>
              <NavLink activeClassName="active" to="/secure-page">
                Secure page
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink activeClassName="active" to="/login-out">
            {loginMsg}
          </NavLink>
        </li>
        <li style={{ float: "right", color: "white", marginRight: "20px" }}>
          {username}
          <br />
          {roles}
        </li>
      </ul>
    </div>
  );
}

export default NavBar;

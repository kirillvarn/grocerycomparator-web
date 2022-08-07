import React, { useEffect, useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

import "./Header.css";


function Header() {
  const location = useLocation();
  const getClassName = (path) => {
    if(path === "") {
      return "header-active"
    }
    if(location.pathname == path) {
      return "header-active"
    }
    return ""
  }
  return (
    <div className="shadow header bg-dark">
      <Navbar bg="dark" variant="dark">
        <Container className="header_container">
          <div>
            <Link className={getClassName("/")} to="/">Index</Link>
            <Link className={getClassName("/list")} to="/list">List</Link>
            <Link className={getClassName("/compare")} to="/compare">Compare</Link>
            <Link className={getClassName("/stat")} to="/stat">Stats</Link>
          </div>
          <div>
            <Link to="/admin">Admin panel</Link>
          </div>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header;

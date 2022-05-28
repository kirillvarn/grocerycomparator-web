import React, { Component } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


export class Header extends Component {
  render() {
    return(
        <div>
          <Navbar bg="dark" variant="dark">
              <Container>
                <Navbar.Brand href="/">Home</Navbar.Brand>
                <Nav className="me-auto">
                <Nav.Link href="grocerycomparator-web/stat">Stats</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
              </Container>
          </Navbar>
        </div>
    )
  }
}

export default Header;

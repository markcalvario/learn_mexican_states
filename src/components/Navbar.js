import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";

function NavBar() {
  return (
    <Navbar className="bg-black  py-3" variant="dark">
        
        <Navbar.Brand className="text-white w-33 px-5" href="/">Mexican Geography 101</Navbar.Brand>
        
        <Nav className="text-uppercase ps-5 ms-5">
            <Nav.Link className="text-white px-5" href="/">Home</Nav.Link>
            <Nav.Link className="text-white px-5" href="/learn">Learn</Nav.Link>
            <Nav.Link className="text-white px-5" href="/quiz">Quiz</Nav.Link>
        </Nav>

        
    </Navbar>
  );
}

export default NavBar;
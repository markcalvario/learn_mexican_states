import React from "react"
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav"

function NavBar() {
  return (
    <Navbar className="bg-black justify-content-center py-3" variant="dark">
        <Nav className="text-uppercase">
            <Nav.Link className="text-white px-5" href="/">Home</Nav.Link>
            <Nav.Link className="text-white px-5" href="/learn">Learn</Nav.Link>
            <Nav.Link className="text-white px-5" href="/quiz">Quiz</Nav.Link>
        </Nav>
    </Navbar>
  );
}

export default NavBar;
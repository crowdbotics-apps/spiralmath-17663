import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { userActions } from "../../redux/user/user.actions";

const Header = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector(
    (state) => state.authentication && state.authentication.loggedIn
  );

  const handleLogout = () => {
    dispatch(userActions.logout());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">SpiralMath</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {loggedIn ? (
          <Button className="ml-2" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <React.Fragment>
            {" "}
            <Link to="/signup">
              <Button>Signup</Button>
            </Link>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;

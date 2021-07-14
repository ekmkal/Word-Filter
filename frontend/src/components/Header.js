import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect className="py-2">
        <Container style={{ color: '#ffffff' }}>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="https://i.ibb.co/pWwLZD8/jakob-owens-d-GXGDairm-K0-unsplash.jpg"
                width="40"
                alt="word_filter_logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {userInfo && !userInfo.isAdmin && (
                <LinkContainer to="/mywords">
                  <Nav.Link>
                    <i className="fas fa-clipboard-list"></i> My Words
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && !userInfo.isAdmin && (
                <LinkContainer to="/myfavs">
                  <Nav.Link>
                    <i className="fas fa-bookmark"></i> My Favs
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo ? (
                <NavDropdown title="Account" id="account" style={{ marginRight: '0px' }}>
                  <NavDropdown.Item disabled>{userInfo.username}</NavDropdown.Item>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

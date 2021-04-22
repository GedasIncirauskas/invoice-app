import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import PropTypes from "prop-types";
import Login from "../Login/Login";
import Avatar from "../../modules/0.jpeg";
import "./Navbar.scss";

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="B">
      <Navbar color="light" light expand="md">
        <NavbarBrand>
          <Logo />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Link to="/panele/saskaitos">Sąskaitos</Link>
            </NavItem>
            <NavItem>
              <Link to="/panele/sanaudos">Sąnaudos</Link>
            </NavItem>
            <NavItem>
              <Link to="/panele/klientai">Klientai</Link>
            </NavItem>
            <NavItem>
              <Link to="/panele/produktai">Produktai</Link>
            </NavItem>
            <NavItem>
              <Link to="/panele/projektai">Projektai</Link>
            </NavItem>
          </Nav>
          <div className="Avatar">
            <img src={Avatar} alt="Mano nuotrauka" />
          </div>
          <NavbarText>
            <Login />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Example;

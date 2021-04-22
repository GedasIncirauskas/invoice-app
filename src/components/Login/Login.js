import React, { Component } from "react";
import Login from "./Login.scss";
import axios from "../../utils/request";
import cookie from "react-cookies";

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

class Avatar extends Component {
  logoutHandler() {
    const accessToken = cookie.load("accessToken");
    axios.post(`/Users/logout?access_token=${accessToken}`).then((response) => {
      cookie.remove("userId");
      cookie.remove("accessToken");
      window.location.href = "/";
    });
  }

  render() {
    return (
      <div>
        <div className="Login">
          <UncontrolledDropdown setActiveFromChild>
            <DropdownToggle tag="a" className="nav-link" caret>
              Mano paskyra
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem tag="a" href="/">
                Mano duomenys
              </DropdownItem>
              <DropdownItem tag="a" onClick={() => this.logoutHandler()}>
                Atsijungti
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>
    );
  }
}

export default Avatar;

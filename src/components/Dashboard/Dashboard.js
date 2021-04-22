import React, { Component } from "react";
import NavBar from "../NavBar/NavBar";
import PropTypes from "prop-types";
import axios from "../../utils/request";
import cookie from "react-cookies";

class Dashboard extends Component {
  state = {
    user: {},
  };

  componentWillMount() {
    const userId = cookie.load("userId");
    const accessToken = cookie.load("accessToken");
    axios
      .get(`/Users/${userId}?access_token=${accessToken}`)
      .then((response) => {
        this.setState({ user: response.data });
      })
      .catch((response) => {
        window.location.href = "/";
      });
  }

  render() {
    return (
      <div>
        <NavBar />
      </div>
    );
  }
}

export default Dashboard;

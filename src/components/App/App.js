import React from "react";
import PropTypes from "prop-types";
import NavBar from "../NavBar/NavBar";
import Authe from "../Login/Auth";

import "./App.scss";

const App = (props) => <div>{props.children}</div>;

App.propTypes = {
  children: PropTypes.any,
};

export default App;

import React from "react";
import Logo from "./Logo.scss";

import logotipas from "../../modules/Logo.jpeg";

const logo = (props) => (
  <div className="Logo">
    <img src={logotipas} alt="Mano logo" />
  </div>
);

export default logo;

import React, { Component } from "react";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "../../utils/request";
import cookie from "react-cookies";
import Logo from "../Logo/Logo";

import Auth from "./Auth.css";

class Authe extends Component {
  state = {
    informacija: {
      email: "",
      password: "",
    },
  };

  changeHandler(reiksme, kaKeiciam) {
    this.state.informacija[kaKeiciam] = reiksme;
    this.setState({ informacija: this.state.informacija });
  }

  submitHandler() {
    axios
      .post("/Users/login", this.state.informacija)
      .then((response) => {
        cookie.save("userId", response.data.userId);
        cookie.save("accessToken", response.data.id);
        window.location.href = "/panele/saskaitos";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  registerHandler() {
    axios
      .post("/Users", this.state.informacija)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Auth">
        <div>
          <Logo />
        </div>
        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">El paštas:</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Jūsų el. paštas"
                  value={this.state.email}
                  onChange={(event) =>
                    this.changeHandler(event.target.value, "email")
                  }
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Slaptažodis</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Jūsų slaptažodis"
                  value={this.state.password}
                  onChange={(event) =>
                    this.changeHandler(event.target.value, "password")
                  }
                />
              </FormGroup>
            </Col>
          </Row>
          <Button color="primary" onClick={() => this.submitHandler()}>
            Prisijungti
          </Button>
          <Button color="link" onClick={() => this.registerHandler()}>
            Registruotis
          </Button>
        </Form>
      </div>
    );
  }
}

export default Authe;

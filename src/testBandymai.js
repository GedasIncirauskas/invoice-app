import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";

class SaskaituSarasas extends Component {
  state = {
    input: {
      name: "",
      age: "",
    },
    error: [],
  };

  changeHandler = (inputObjektas, keitimas) => {
    this.state.input[keitimas] = inputObjektas;
    this.setState({ input: this.state.input });
  };

  addClick = () => {
    let errors = [];
    this.setState({ error: [] });
    if (this.state.input.name.length < 5 || this.state.input.age < 18) {
      if (this.state.input.name.length < 5) {
        errors.push("Informacija neatitinka reikalavimu");
      }
      if (this.state.input.age < 18) {
        errors.push("amzius");
      }
      this.setState({ error: errors });
    } else {
    }
  };

  render() {
    return (
      <div>
        <Input
          type="text"
          name="text"
          id="test"
          value={this.state.input.name}
          invalid={this.state.input.name.length <= 5 && this.state.error}
          onChange={(event) => this.changeHandler(event.target.value, "name")}
        />

        <Input
          type="number"
          name="number"
          id="test"
          value={this.state.input.age}
          invalid={this.state.input.age < 18 && this.state.error}
          onChange={(event) => {
            console.log(event.target);
            this.changeHandler(event.target.value, "age");
          }}
        />

        <Button onClick={() => this.addClick()}>Spausk!</Button>
        {this.state.error.map((e) => (
          <Alert color="danger">{e}</Alert>
        ))}
      </div>
    );
  }
}

export default SaskaituSarasas;

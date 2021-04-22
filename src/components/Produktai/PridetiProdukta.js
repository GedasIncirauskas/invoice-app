import React, { Component } from "react";
import { Col, Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { Link, useHistory } from "react-router-dom";

import ProduktaiStyle from "./ProduktaiStyle.scss";
import axios from "../../utils/request";

class PridetiProdukta extends Component {
  state = {
    listas: {
      name: "",
      price: 0,
      description: "",
      unit: "",
    },
    error: "",
  };

  changeText = (reiksmes, propertes) => {
    this.state.listas[propertes] = reiksmes;
    this.setState({ listas: this.state.listas });
  };

  addProduct = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    if (
      this.state.listas.name.length == 0 ||
      this.state.listas.price.length == 0 ||
      this.state.listas.description.length == 0 ||
      this.state.listas.unit.length == 0
    ) {
      this.setState({ error: "Užpildykite visus laukus!" });
      return;
    }

    // nebevyksta
    if (this.state.listas.id) {
      axios
        .put(`/products/${this.state.listas.id}`, this.state.listas)
        .then((response) => {
          this.props.history.push("/produktai");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    axios
      .post("/products", this.state.listas)
      .then((response) => {
        this.props.history.push("/produktai");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    axios
      .get(`/products/${this.props.match.params.product}`) //pasiemem is componento. Galima pasiekti siuos data.
      .then((response) => {
        this.setState({ listas: response.data });
      });
  }

  render() {
    return (
      <div className="Style">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="pavadinimas1" className="mr-sm-2">
              Pavadinimas
            </Label>
            <Input
              type="text"
              name="text"
              id="pavadinimas1"
              placeholder="Pavadinimas"
              value={this.state.listas.name}
              onChange={(event) => this.changeText(event.target.value, "name")}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="kaina1" className="mr-sm-2">
              Kaina
            </Label>
            <Input
              type="number"
              name="number"
              id="kaina1"
              placeholder="Kaina"
              min="0"
              value={this.state.listas.price}
              onChange={(event) => this.changeText(event.target.value, "price")}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="aprasymas1" className="mr-sm-2">
              Aprašymas
            </Label>
            <Input
              type="text"
              name="text"
              id="aprasymas1"
              placeholder="Aprašymas"
              value={this.state.listas.description}
              onChange={(event) =>
                this.changeText(event.target.value, "description")
              }
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleSelect" sm={3}>
              Vienetai
            </Label>
            <Col sm={9}>
              <Input
                type="select"
                name="select"
                id="vienetai1"
                value={this.state.listas.unit}
                onChange={(event) =>
                  this.changeText(event.target.value, "unit")
                }
              >
                <option />
                <option>kg</option>
                <option>L</option>
                <option>vnt</option>
                <option>m</option>
              </Input>
            </Col>
          </FormGroup>
          <Button onClick={this.addProduct}>Pridėti</Button>
        </Form>
        {this.state.error ? (
          <Alert color="danger">{this.state.error}</Alert>
        ) : null}
      </div>
    );
  }
}

export default PridetiProdukta;

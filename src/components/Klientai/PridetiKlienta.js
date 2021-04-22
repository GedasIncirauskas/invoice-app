import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { useHistory } from "react-router-dom";

import axios from "../../utils/request";
import KlientaiStyle from "./KlientaiStyle.scss";

class PridetiKlienta extends Component {
  state = {
    informacija: {
      name: "",
      number: "",
      bankAccount: "",
    },
    error: null,
  };

  keiciamReiksme = (reiksme, kaKeiciam) => {
    this.state.informacija[kaKeiciam] = reiksme;
    this.setState({ informacija: this.state.informacija });
    // console.log(this.state.informacija)
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ error: null });
    if (
      this.state.informacija.name.length === 0 ||
      this.state.informacija.number.length === 0 ||
      this.state.informacija.bankAccount.length === 0
    ) {
      this.setState({ error: "Užpildykite visus laukus!" });
      return;
    }
    if (this.state.informacija.id) {
      axios
        .put(`/clients/${this.state.informacija.id}`, this.state.informacija)
        .then((response) => {
          this.props.history.push("/klientai");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

    axios
      .post("/clients", this.state.informacija)
      .then((response) => {
        this.props.history.push("/klientai");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    axios.get(`/clients/${params.client}`).then((response) => {
      this.setState({ informacija: response.data });
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
              onChange={(event) =>
                this.keiciamReiksme(event.target.value, "name")
              }
              type="text"
              name="pavadinimas"
              id="pavadinimas1"
              placeholder="Įmonės pavadinimas"
              invalid={
                this.state.informacija.name.length == 0 && this.state.error
              }
              value={this.state.informacija.name}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="imonesKodas" className="mr-sm-2">
              Įmonės kodas
            </Label>
            <Input
              onChange={(event) =>
                this.keiciamReiksme(event.target.value, "number")
              }
              type="text"
              name="imonesKodas"
              id="imonesKodas"
              placeholder="Įmonės kodas"
              maxLength="11"
              invalid={
                this.state.informacija.number.length === 0 && this.state.error
              }
              valid={this.state.informacija.number.length === 11}
              value={this.state.informacija.number}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="saskaitosNr" className="mr-sm-2">
              Sąskaitos numeris
            </Label>
            <Input
              onChange={(event) =>
                this.keiciamReiksme(event.target.value, "bankAccount")
              }
              type="text"
              name="saskaitosNr"
              id="saskaitosNr"
              placeholder="Sąskaitos numeris"
              maxLength="20"
              invalid={
                this.state.informacija.bankAccount.length === 0 &&
                this.state.error
              }
              valid={this.state.informacija.bankAccount.length === 20}
              value={this.state.informacija.bankAccount}
            />
          </FormGroup>
          <button onClick={this.submitHandler}>Pridėti</button>
        </Form>
        {this.state.error ? (
          <Alert color="danger">{this.state.error}</Alert>
        ) : null}
      </div>
    );
  }
}

export default PridetiKlienta;

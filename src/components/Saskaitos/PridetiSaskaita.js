import React, { Component } from "react";
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Table,
} from "reactstrap";
import axios from "../../utils/request";
import { useHistory } from "react-router-dom";

class PridetiSaskaita extends Component {
  state = {
    selectedProduct: {},
    produktai: [],
    klientai: [],
    produktaiPasirinkti: [],
    rodyti: false,
    totalInfo: {
      clientId: "",
      date: "",
      status: "",
      number: "SF-" + Math.floor(Math.random() * 1000),
      total: null,
    },
    error: null,
  };

  componentWillMount() {
    axios
      .get("/clients")
      .then((response) => {
        this.setState({ klientai: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/products")
      .then((response) => {
        this.setState({ produktai: response.data });
        // console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addToTable = () => {
    if (typeof this.state.selectedProduct.id === "undefined") {
      // console.log('eroras')
      return;
    }
    const produktas = this.state.produktaiPasirinkti.find(
      (object) => object.id === this.state.selectedProduct.id
    );
    if (produktas) {
      // console.log('pimpis')
      return;
    }
    this.state.produktaiPasirinkti.push(this.state.selectedProduct);
    this.setState({ produktaiPasirinkti: this.state.produktaiPasirinkti });
  };

  pridetiProdukta(value) {
    // console.log(parseInt(value), this.state.produktai);
    const produktas = this.state.produktai.find(
      (object) => object.id === parseInt(value)
    );
    produktas.kiekis = 0;
    this.setState({ selectedProduct: produktas });
  }

  keistiKieki(value, index) {
    this.state.produktaiPasirinkti[index].kiekis = parseInt(value);
    this.setState({ produktaiPasirinkti: this.state.produktaiPasirinkti });
    // console.log(this.state.produktaiPasirinkti[index])
  }

  skaiciuotiViso() {
    let total = 0;
    this.state.produktaiPasirinkti.forEach((p) => {
      total += p.kiekis * p.price;
    });
    return total.toFixed(2);
  }
  slepti = () => {
    let arRodyti = this.state.rodyti;
    this.setState({ rodyti: !arRodyti });
  };

  ikeltiSaskaita = () => {
    let data = {
      date: this.state.totalInfo.date,
      number: this.state.totalInfo.number,
      status: this.state.totalInfo.status,
      products: this.state.produktaiPasirinkti,
      clientId: this.state.totalInfo.clientId,
      total: this.skaiciuotiViso(),
    };

    if (this.state.totalInfo.id) {
      axios
        .put(`/invoices/${this.state.totalInfo.id}`, this.state.totalInfo)
        .then((response) => {
          this.props.history.push("/");
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }
    axios
      .post("/invoices", data)
      .then((response) => {
        this.props.history.push("/");
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  keitimasDuomenu = (reiksme, value) => {
    this.state.totalInfo[value] = reiksme;
    this.setState({ totalInfo: this.state.totalInfo });
  };
  componentDidMount() {
    const {
      match: { params },
    } = this.props;
    axios.get(`/invoices/${params.invoice}`).then((response) => {
      this.setState({ totalInfo: response.data });
    });
  }

  render() {
    return (
      <div className="Style">
        <Form>
          <FormGroup>
            <Label for="saskaitosNr" sm={2}>
              Sąskaitos numeris
            </Label>
            <Col sm={10}>
              <Input
                type="text"
                name="Sąskaitos numeris"
                placeholder="Įveskite sąskaitos numerį"
                id="Sąskaitos numeris"
                onChange={(event) =>
                  this.keitimasDuomenu(event.target.value, "number")
                }
                value={this.state.totalInfo.number}
              />
            </Col>
            <Label for="klientai" sm={2}>
              Įmonės pavadinimas
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="Įmonės pavadinimas"
                id="Įmonės pavadinimas"
                onChange={(event) =>
                  this.keitimasDuomenu(event.target.value, "clientId")
                }
                value={this.state.totalInfo.clientId}
              >
                <option>Pasirinkite įmonę</option>
                {this.state.klientai.map((cust) => (
                  <option value={cust.id} key={cust.id}>
                    {cust.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="saskaitos data" sm={2}>
              Sąskaitos data
            </Label>
            <Col sm={10}>
              <Input
                type="date"
                name="date"
                id="saskaitos data"
                placeholder="Sąskaitos data"
                onChange={(event) =>
                  this.keitimasDuomenu(event.target.value, "date")
                }
                value={this.state.totalInfo.date}
              />
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="produktai" sm={2}>
              Produktai
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="select"
                id="produktai"
                onChange={(event) => this.pridetiProdukta(event.target.value)}
              >
                <option>Pasirinkite produktą</option>
                {this.state.produktai.map((prod) => (
                  <option key={prod.id} value={prod.id}>
                    {prod.name}: {prod.description}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <Button onClick={this.addToTable}>Pridėti</Button>
          <Button color="info" onClick={this.slepti}>
            {this.state.rodyti ? "Uždaryti" : "Atidaryti"}
          </Button>
          {this.state.rodyti ? (
            <div>
              <Table bordered>
                <thead>
                  <tr>
                    <th>Pavadinimas</th>
                    <th>Kaina</th>
                    <th>Kiekis</th>
                    <th>Suma</th>
                    <th>Vientai</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.produktaiPasirinkti.map((p, index) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{p.price}</td>
                      <td>
                        <Input
                          type="number"
                          min="0"
                          onChange={(event) =>
                            this.keistiKieki(event.target.value, index)
                          }
                        />
                      </td>
                      <td>{parseFloat(p.kiekis * p.price).toFixed(2)}</td>
                      <td>{p.unit}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <strong style={{ float: "right" }}>
                Viso: {this.skaiciuotiViso()} EUR
              </strong>
            </div>
          ) : null}
          <FormGroup>
            <Label for="produktai" sm={2}>
              Apmokėjimas
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="select"
                id="produktai"
                onChange={(event) =>
                  this.keitimasDuomenu(event.target.value, "status")
                }
                value={this.state.totalInfo.status}
              >
                <option>Pasirinkite</option>
                <option>Neapmokėta</option>
                <option>Apmokėta</option>
              </Input>
            </Col>
          </FormGroup>
          <Button onClick={this.ikeltiSaskaita}>Įkelti sąskaitą</Button>
        </Form>
      </div>
    );
  }
}

export default PridetiSaskaita;

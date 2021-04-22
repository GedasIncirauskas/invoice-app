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
import { useHistory, Link } from "react-router-dom";
import moment from "moment";

import PridetiSaskaita from "./PridetiSaskaita";
import PieChart from "../PieChart/PieChart";

class SaskaituSarasas extends Component {
  state = {
    visaInfo: [],
    imones: [],
    rodomas: [],
    mokejimai: [],
  };

  componentWillMount() {
    axios
      .get("/invoices")
      .then((response) => {
        this.setState({
          visaInfo: response.data,
          rodomas: response.data,
          mokejimai: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("/clients")
      .then((response) => {
        this.setState({ imones: response.data });
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  dateFormate(date) {
    return moment(date).format("YYYY/MM/DD");
  }

  removeInvoice(e, id, index) {
    axios
      .delete(`/invoices/${id}`)
      .then((response) => {
        this.state.visaInfo.splice(index, 1);
        this.setState({ visaInfo: this.state.visaInfo });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  filterImone(imonesId) {
    if (imonesId === "Pasirinkite") {
      return this.setState({ rodomas: this.state.visaInfo });
    }
    let imoniuFiltras = this.state.visaInfo.filter((invoice) => {
      // console.log('saskaita:', invoice, 'pasirinktas id: ', imonesId)
      return invoice.clientId === parseInt(imonesId); // id cia gauname is event.target.value, nes cia jis yra lygus uzsivadintam imonesId
    });
    this.setState({ rodomas: imoniuFiltras });
  }

  filterMokejimai(mokejimas) {
    if (mokejimas === "Pasirinkite") {
      return this.setState({ rodomas: this.state.visaInfo });
    }
    let statusFilter = this.state.mokejimai.filter((stat) => {
      return stat.status === mokejimas;
    });
    this.setState({ rodomas: statusFilter });
  }

  render() {
    return (
      <div className="Style">
        <Form>
          <FormGroup>
            <Label for="filter" sm={2}>
              <h6>Filtruoti įmonę:</h6>
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="select"
                id="filter"
                onChange={(event) => this.filterImone(event.target.value)}
              >
                <option>Pasirinkite</option>
                {this.state.imones.map((imones, index) => (
                  <option value={imones.id} key={imones.id}>
                    {imones.name}
                  </option>
                ))}
              </Input>
            </Col>
          </FormGroup>
          <FormGroup>
            <Label for="filterą" sm={2}>
              <h6>Filtruoti mokėjimus:</h6>
            </Label>
            <Col sm={10}>
              <Input
                type="select"
                name="select"
                id="filterą"
                onChange={(event) => this.filterMokejimai(event.target.value)}
              >
                <option>Pasirinkite</option>
                <option>Apmokėta</option>
                <option>Neapmokėta</option>
              </Input>
            </Col>
          </FormGroup>
        </Form>
        <br />
        <Link to="/prideti-saskaita" className="Click">
          Įvesti sąskaitą
        </Link>
        <Table bordered>
          <thead>
            <tr>
              <th>Sąskaitos numeris</th>
              <th>Kliento pavadinimas</th>
              <th>Sąskaitos data</th>
              <th>Produktas</th>
              <th>SUMA</th>
              <th>Apmokėjimas</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          {this.state.rodomas.map((info, index) => (
            <tbody key={info.id}>
              <tr>
                <td>{info.number}</td>
                <td>{info.client ? info.client.name : "Nežinomas"}</td>
                <td>{this.dateFormate(info.date)}</td>
                <td>
                  {info.products.map((product) => (
                    <div key={product.id}>
                      {product.name}, Kaina vnt: {product.price} EUR
                    </div>
                  ))}
                </td>
                <td>{info.total} EUR</td>
                <td>{info.status}</td>
                <th>
                  <Button
                    outline
                    color="danger"
                    onClick={(e) => this.removeInvoice(e, info.id, index)}
                  >
                    Trinti
                  </Button>
                  <Link to={`/atnaujinti-saskaita/${info.id}`}>
                    <Button outline color="info">
                      Redaguoti
                    </Button>
                  </Link>
                </th>
              </tr>
            </tbody>
          ))}
        </Table>
        <br />
        {this.state.rodomas.length > 0 ? (
          <PieChart infoChart={this.state.rodomas} />
        ) : null}
      </div>
    );
  }
}

export default SaskaituSarasas;

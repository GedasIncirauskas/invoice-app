import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

import axios from "../../utils/request";
import KlientaiStyle from "./KlientaiStyle.scss";
import PridetiKlienta from "./PridetiKlienta";

class KlientuSarasas extends Component {
  state = {
    sarasas: [],
  };

  componentWillMount() {
    console.log("Kraunam duomenis");
    axios
      .get("/clients")
      .then((response) => {
        this.setState({ sarasas: response.data });
        // console.log('duomenys', response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeHandler = (e, id, index) => {
    axios
      .delete(`/clients/${id}`)
      .then((response) => {
        this.state.sarasas.splice(index, 1);
        this.setState({ sarasas: this.state.sarasas });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Style">
        <Link to="/prideti-klienta" className="Click">
          Įvesti klientą
        </Link>
        <Table bordered>
          <thead>
            <tr>
              <th>Pavadinimas</th>
              <th>Įmonės kodas</th>
              <th>Sąskaitos numeris</th>
              <th>Veiksmai</th>
            </tr>
          </thead>

          {this.state.sarasas.map((item, index) => (
            <tbody key={item.id}>
              <tr>
                <td>{item.name}</td>
                <td>{item.number}</td>
                <td>{item.bankAccount}</td>
                <td>
                  <Button
                    outline
                    color="danger"
                    onClick={(e) => this.removeHandler(e, item.id, index)}
                  >
                    Trinti
                  </Button>
                  <Link to={`/atnaujinti-klienta/${item.id}`}>
                    <Button outline color="info">
                      Redaguoti
                    </Button>
                  </Link>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </div>
    );
  }
}

export default KlientuSarasas;

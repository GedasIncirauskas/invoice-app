import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "reactstrap";

import axios from "../../utils/request";
import PridetiProdukta from "./PridetiProdukta";
import ProduktaiStyle from "./ProduktaiStyle.scss";

class ProduktuSarasas extends Component {
  state = {
    sarasasProduktu: [],
  };

  componentWillMount() {
    axios
      .get("/products")
      .then((response) => {
        this.setState({ sarasasProduktu: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  removeProduct = (e, id, index) => {
    axios
      .delete(`/products/${id}`)
      .then((response) => {
        this.state.sarasasProduktu.splice(index, 1);
        this.setState({ sarasasProduktu: this.state.sarasasProduktu });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="Style">
        <Link to="/prideti-produkta" className="Click">
          Įvesti produktą
        </Link>
        <Table bordered>
          <thead>
            <tr>
              <th>Pavadinimas</th>
              <th>Produkto kaina</th>
              <th>Aprašymas</th>
              <th>Kiekis</th>
              <th>Veiksmai</th>
            </tr>
          </thead>
          {this.state.sarasasProduktu.map((prod, index) => (
            <tbody key={prod.id}>
              <tr>
                <td>{prod.name}</td>
                <td>
                  <strong>{prod.price} EUR</strong>
                </td>
                <td>{prod.description}</td>
                <td>{prod.unit}</td>
                <td>
                  <Button
                    outline
                    color="danger"
                    onClick={(e) => this.removeProduct(e, prod.id, index)}
                  >
                    Trinti
                  </Button>
                  <Link to={`/atnaujinti-produkta/${prod.id}`}>
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

export default ProduktuSarasas;

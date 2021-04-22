import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import thunkMiddleware from "redux-thunk";

import { Route, BrowserRouter as Router } from "react-router-dom";

import rootReducer from "./modules";
import App from "./components/App";
import Saskaitos from "./containers/Saskaitos";
import Sanaudos from "./containers/Sanaudos";
import Projektai from "./containers/Projektai";
import Produktai from "./containers/Produktai";
import Klientai from "./containers/Klientai";
import PridetiKlienta from "./components/Klientai/PridetiKlienta";
import PridetiProdukta from "./components/Produktai/PridetiProdukta";
import PridetiSaskaita from "./components/Saskaitos/PridetiSaskaita";
import Dashboard from "./components/Dashboard/Dashboard";

import Authe from "./components/Login/Auth";

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const routes = (
  <Router>
    <App>
      <Route exact path="/" component={Authe} />
      <Route path="/panele" component={Dashboard} />
      <Route path="/panele/saskaitos" component={Saskaitos} />
      <Route path="/panele/prideti-saskaita" component={PridetiSaskaita} />
      <Route
        path="/panele/atnaujinti-saskaita/:invoice"
        component={PridetiSaskaita}
      />
      <Route path="/panele/sanaudos" component={Sanaudos} />
      <Route path="/panele/projektai" component={Projektai} />
      <Route path="/panele/produktai" component={Produktai} />
      <Route path="/panele/prideti-produkta" component={PridetiProdukta} />
      <Route
        path="/panele/atnaujinti-produkta/:product"
        component={PridetiProdukta}
      />
      <Route path="/panele/klientai" component={Klientai} />
      <Route path="/panele/prideti-klienta" component={PridetiKlienta} />
      <Route
        path="/panele/atnaujinti-klienta/:client"
        component={PridetiKlienta}
      />
    </App>
  </Router>
);

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById("root")
);

import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Alert } from "reactstrap";

import Authe from "../Login/Auth";

class Test extends Component {
  state = {
    items: [
      { name: "Gedas", age: 19 },
      { name: "Pranas", age: 45 },
      { name: "Jonas", age: 18 },
      { name: "Bebras", age: 16 },
      { name: "Stalas", age: 10 },
    ],
    tekstas: "",
  };

  keistas = (event) => {
    this.setState({ tekstas: event.target.value });
  };

  render() {
    const items = [
      { name: "Gedas", age: 19 },
      { name: "Pranas", age: 45 },
      { name: "Jonas", age: 18 },
      { name: "Bebras", age: 16 },
      { name: "Stalas", age: 10 },
    ];
    // const filteredItems = items.filter((item) => {
    // 	return item.age <= 18
    // })

    // const findItems = items.find((item) => {
    // 	// return item.name.length == 5
    // 	return item.name === 'Bebras'
    // })

    // items.forEach(item => (
    // 	// console.log(item.name, item.age)
    // 	// console.log(item.name === 'Gedas')
    // ))

    // const Items = items.every((item) => {
    // 	return item.age <= 17
    // })
    // console.log(Items)

    const reduceSintax = items.reduce((reduce, item) => {
      return reduce * item.age;
    }, 1);
    console.log(reduceSintax);

    return (
      <div>
        {this.state.items.map((item) => (
          <p key={item.name}>
            {" "}
            Vardas: {item.name} ir {item.age} metai{" "}
          </p>
        ))}
        <Input type="text" value={this.state.tekstas} onChange={this.keistas} />
        <h1> Bus: {this.state.tekstas} </h1>
        <Authe />
      </div>
    );
  }
}

export default Test;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initMenus: ['Home', 'About', 'Contact'],
      menus: ''
    }
  }
  dropdownFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  handleChange = (event) => {
    let userInput = event.target.value
    let inputRegex = new RegExp(userInput.toLowerCase())
    let newMenus = this.state.initMenus.filter(menu => {
      if(menu.toLowerCase().search(inputRegex) != -1 ) {
        return menu
      }
    })

    this.setState({
      menus : newMenus
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="dropdown">
          <button onClick={this.dropdownFunction} className="dropbtn">Dropdown</button>
          <div id="myDropdown" className="dropdown-content">
            <input type="text" name="name" onChange={this.handleChange} />
            {this.state.menus.map((object, i) => {
              return <a href="#">{object}</a>
            })}
          </div>
        </div>
      </div>
    );
  }
  componentWillMount() {
    this.setState({
      menus: this.state.initMenus
    })
  }
}

export default App;

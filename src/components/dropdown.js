import React, { Component } from 'react';
import '../App.css';

class Dropdown extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initMenus: ['About', 'Base', 'Blog', 'Contact', 'Custom', 'Support', 'Tools'],
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
      if(menu.toLowerCase().search(inputRegex) !== -1 ) {
        return menu
      }
    })

    this.setState({
      menus : newMenus
    })
  }

  render() {
    return (
      <div className="dropdown">
        <button onClick={this.dropdownFunction} className="dropbtn">Dropdown</button>
        <div id="myDropdown" className="dropdown-content">
          <input type="text" placeholder="Search.." name="name" onChange={this.handleChange} />
          {this.state.menus.map((object, i) => {
            return <a href="#" key={i}>{object}</a>
          })}
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

export default Dropdown;

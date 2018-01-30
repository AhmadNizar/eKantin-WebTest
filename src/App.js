import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import faker from 'faker'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      initMenus: ['About', 'Base', 'Blog', 'Contact', 'Custom', 'Support', 'Tools'],
      menus: '',
      initDataTable: [],
      dataTable: '',
      nameSortStatus: 'up'
    }
  }
  sortByName = () => {
    console.log('jos')
    let tempDataTable = this.state.dataTable
    // sort by name
    if(this.state.nameSortStatus === 'down') {
      tempDataTable.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      this.setState({
        dataTable: tempDataTable,
        nameSortStatus: 'up'
      })
    }

    if(this.state.nameSortStatus === 'up') {
      tempDataTable.sort(function(a, b) {
        var nameA = a.name.toUpperCase(); // ignore upper and lowercase
        var nameB = b.name.toUpperCase(); // ignore upper and lowercase
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });

      this.setState({
        dataTable: tempDataTable,
        nameSortStatus: 'down'
      })
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
  handleChangeDataTable = (event) => {
    let userInput = event.target.value
    let inputRegex = new RegExp(userInput.toLowerCase())
    let newDataTable = this.state.initDataTable.filter(data => {
      if(data.name.toLowerCase().search(inputRegex) !== -1 ) {
        return data
      }
    })

    this.setState({
      dataTable : newDataTable
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="dropdown">
          <button onClick={this.dropdownFunction} className="dropbtn">Dropdown</button>
          <div id="myDropdown" className="dropdown-content">
            <input type="text" placeholder="Search.." name="name" onChange={this.handleChange} />
            {this.state.menus.map((object, i) => {
              return <a href="#">{object}</a>
            })}
          </div>
        </div>
        <br/>
        <br/>
        <div className="nav-table">
          <div className="page-table">
            show
            <select>
              <option value="10">10</option>
              <option value="9">9</option>
              <option value="8">8</option>
              <option value="7">7</option>
              <option value="6">6</option>
              <option value="5">5</option>
            </select>
            entries
          </div>
          <div className="search-table">
            Search: <input type="text" name="username" onChange={this.handleChangeDataTable} />
          </div>
        </div>
        <div className="data-table">
          <table>
            <tr>
              <th onClick={this.sortByName}><a>Name</a></th>
              <th>Position</th>
              <th>Office</th>
              <th>Age</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
            {this.state.dataTable.map((object, i) => {
              return (
                <tr>
                  <td>{object.name}</td>
                  <td>{object.position}</td>
                  <td>{object.office}</td>
                  <td>{object.age}</td>
                  <td>{object.name}</td>
                  <td>${object.salary}</td>
                </tr>
              )
            })}
          </table>
          </div>
        </div>
    );
  }
  componentWillMount() {
    let initDataTable = []
    for(let i=0; i<10; i++) {
      initDataTable.push({
        name: faker.name.findName(),
        position: faker.name.jobTitle(),
        office: faker.address.city(),
        age: Math.floor((Math.random() * 55) + 20),
        startDate: faker.date.past(),
        salary: faker.commerce.price()
      })
    }
    this.setState({
      menus: this.state.initMenus,
      initDataTable: initDataTable,
      dataTable: initDataTable
    })
  }
}

export default App;

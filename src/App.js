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
      sortStatus: 'up'
    }
  }
  sortDataTable = (inputType) => {
    let tempDataTable = this.state.dataTable
    let inputA = ''
    let inputB = ''
    let tempSortStatus = this.state.sortStatus

    tempDataTable.sort((a, b) => {
      if(inputType === 'name') {
        inputA = a.name.toUpperCase()
        inputB = b.name.toUpperCase()
      }

      if(inputType === 'position') {
        inputA = a.position.toUpperCase()
        inputB = b.position.toUpperCase()
      }

      if(inputType === 'office') {
        inputA = a.office.toUpperCase()
        inputB = b.office.toUpperCase()
      }

      if(inputType === 'age') {
        inputA = a.age
        inputB = b.age
      }

      if(this.state.sortStatus === 'down') {
        if (inputA < inputB) {
          return -1
        }

        if (inputA > inputB) {
          return 1
        }

        return 0
      }

      if(this.state.sortStatus === 'up') {
        if (inputA > inputB) {
          return -1
        }

        if (inputA < inputB) {
          return 1
        }

        return 0
      }
    })

    if(tempSortStatus === 'down') {
      tempSortStatus = 'up'
    } else {
      tempSortStatus = 'down'
    }

    this.setState({
      dataTable: tempDataTable,
      sortStatus: tempSortStatus
    })
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
              <th onClick={() => this.sortDataTable('name')}><a>Name</a></th>
              <th onClick={() => this.sortDataTable('position')}>Position</th>
              <th onClick={() => this.sortDataTable('office')}>Office</th>
              <th onClick={() => this.sortDataTable('age')}>Age</th>
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

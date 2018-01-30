import React, { Component } from 'react'
import '../App.css'
import faker from 'faker'

class Datatable extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
      <div>
        <div className="nav-table">
          <div className="page-table">
            show
            <select>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            entries
          </div>
          <div className="search-table">
            Search: <input type="text" name="username" onChange={this.handleChangeDataTable} />
          </div>
        </div>
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th onClick={() => this.sortDataTable('name')}>Name</th>
                <th onClick={() => this.sortDataTable('position')}>Position</th>
                <th onClick={() => this.sortDataTable('office')}>Office</th>
                <th onClick={() => this.sortDataTable('age')}>Age</th>
                <th>Start date</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
            {this.state.dataTable.map((object, i) => {
              return (
                <tr key={i}>
                  <td>{object.name}</td>
                  <td>{object.position}</td>
                  <td>{object.office}</td>
                  <td>{object.age}</td>
                  <td>{object.name}</td>
                  <td>${object.salary}</td>
                </tr>
              )
            })}
            </tbody>
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
      initDataTable: initDataTable,
      dataTable: initDataTable
    })
  }
}

export default Datatable;

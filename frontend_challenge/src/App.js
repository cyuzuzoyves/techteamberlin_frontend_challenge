import React, { Component } from 'react';
import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  

class App extends Component {
  state = {
      isLoading: true,
      launches: [],
      error: null
    }

  //function fetch data
  fetchAllLauches() {
    let launchArr = [
      {
        flight_number: 77,
        mission_name: 'NY',
        rocket_name: 'NY2323'

      },
      {
        flight_number: 72,
        mission_name: 'KGL',
        rocket_name: '232323KGL'

      },
      {
        flight_number: 12,
        mission_name: 'UG',
        rocket_name: 'dsadUG21'

      }
    ]

    this.setState({
      launches: launchArr,
      isLoading: false,
    })
    
  }

  componentDidMount() {
    this.fetchAllLauches();
  }

  render() {
    const { isLoading, launches, error } = this.state;
    return (
      <div className="App">
      <h3>Frontend React Coding Challenge - Yves CYUZUZO</h3>

        <h2>SpaceX 20 Latest launches</h2>

        {error ? <p>{error.message}</p> : null}

        <div className="container">
          {!isLoading ? (

            <BootstrapTable data={launches} striped={true} hover={true} search searchPlaceholder={"Search mission name"}>
                  <TableHeaderColumn dataField="flight_number" isKey={true} dataAlign="center" dataSort={true} searchable={false}>Flight number</TableHeaderColumn>
                  <TableHeaderColumn dataField="mission_name"  dataSort={true}>mission name</TableHeaderColumn>
                  <TableHeaderColumn dataField= "rocket_name" searchable={false}>rocket name</TableHeaderColumn>
              </BootstrapTable>
            ): (
              <h4>Loading...</h4>
            )
          }
        </div>
      </div>
    );
  }
}

export default App;

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
    // fetching data from SpaceX API
      fetch(`https://api.spacexdata.com/v3/launches?limit=20&launch_year=2018&order=desc`)
        // We get the API response and receive data in JSON format...
        .then(response => response.json())
        // ...then we push fetched data in our new array
        .then(data => {
          let launchArr = []
          data.map(launch => (
            launchArr.push({
              flight_number: launch.flight_number,
              mission_name: launch.mission_name,
              rocket_name: launch.rocket.rocket_name
            })
          ))
          //... then we update the launches state from pushed data in our new array [lauchArr]
          this.setState({
            launches: launchArr,
            isLoading: false,
          })
        })
        //Catch any errors
        .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchAllLauches();
  }

  render() {
    const { isLoading, launches, error } = this.state;
    const options = {
        defaultSortName: 'flight_number',
        defaultSortOrder: 'asc'
      };
    return (
      <div className="App">
        <h3>Frontend React Coding Challenge - Yves CYUZUZO</h3>
        <h2>SpaceX 20 Latest launches</h2>
        {error ? <p>{error.message}</p> : null}
        <div className="container">
          {!isLoading ? (
            <BootstrapTable data={launches} striped={true} hover={true} search searchPlaceholder="Search mission name" options={options}>
                  <TableHeaderColumn dataField="flight_number" isKey={true} dataAlign="center" dataSort  searchable={false}>Flight number</TableHeaderColumn>
                  <TableHeaderColumn dataField="mission_name"  dataSort>mission name</TableHeaderColumn>
                  <TableHeaderColumn dataField= "rocket_name" searchable={false}>rocket name</TableHeaderColumn>
            </BootstrapTable>
          ): (
            <h4>Loading...</h4>
          )}
        </div>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import {fetchAllLauches} from './modules/action.js';
import { connect } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Table} from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    props.dispatch(fetchAllLauches());
  }
  
  

  render() {
    const { isLoading, launches, error } = this.props;
    
    return (
      <div className='App'>
        <h3>Frontend React Coding Challenge - Yves CYUZUZO</h3>
        <h2>SpaceX 20 Latest launches</h2>
        {error ? <p>{error.message}</p> : null}
        <div className='container'>
          {!isLoading ?
            <Table striped bordered condensed hover bsClass="table">
              <thead>
                <tr>
                  <th>Flight number</th>
                  <th>mission name</th>
                  <th >rocket name</th>
                </tr>
              </thead>
              <tbody>
                {launches.map(function(account, index) {
                  return (
                    <tr key={ index } data-item={ account }>
                      <td >{account.flight_number}</td>
                      <td >{account.mission_name}</td>
                      <td >{account.rocket_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
               
            : <h4>Loading...</h4>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  launches: state.latestLaunches.launches,
  isLoading: state.latestLaunches.isLoading,
  error: state.latestLaunches.error
});

export default connect(mapStateToProps)(App);


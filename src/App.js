import React, { Component } from 'react';
import './App.css';
import {fetchAllLauches} from './modules/action.js';
import { connect } from 'react-redux';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Pagination, Pager} from 'react-bootstrap';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sortDirection: 'ascending',
      currentPage: 1,
      maxLenghtPerPage: 5,
      currentPageData: [],
      pageNumbers:[],
      pagination: true
    };
    props.dispatch(fetchAllLauches());
    this.onPageData = this.onPageData.bind(this);
  }

  // Function to get current data on page and page numbers
  onPageData(currentPage, filteredData){
    var allLauches = [];
    if(!filteredData){
      allLauches=this.props.launches;
    }
    else{
      allLauches=filteredData;

    }
    if(allLauches){
      // Logic for displaying launches
      const indexOfLastTodo = currentPage * this.state.maxLenghtPerPage;
      const indexOfFirstTodo = indexOfLastTodo - this.state.maxLenghtPerPage;
      var currentLaunches = allLauches.slice(indexOfFirstTodo, indexOfLastTodo);

      //logic to get page numbers
      var allpages=[];
      for (let i = 1; i <= Math.ceil((allLauches.length)/this.state.maxLenghtPerPage); i++) {
        allpages.push(i); 
      }

      //set new data on curret page and array of page numbers
      this.setState({ 
        currentPageData: currentLaunches,
        pageNumbers: allpages,
        pagination: true,
        currentPage: currentPage
      });

      //console.log(this.state.currentPage)
    }

  }

  //search function
  onSearch(event) {
    if(event.target.value!==''){
      var allLauches = this.props.launches;
      var searchaVal = allLauches.filter(lauch => lauch.mission_name.includes(event.target.value));
      this.onPageData(1, searchaVal);
      this.setState({
        currentPageData: searchaVal,
        pagination: false
      });
    }
    else{
      this.onPageData(1);
    }    
  }

  //fuction to move on different page
  handleClick(event, pageNumber) {
    this.onPageData(pageNumber);
  }

  onSort(event, sortKey){
    var sorted = this.state.currentPageData;
    if(this.state.sortDirection ==='descending') {
      sorted.sort((a, b) => b[sortKey].localeCompare(a[sortKey]));
      this.setState({ 
        sortDirection: 'ascending',
        currentPageData: sorted
      });
    }else{
      sorted.sort((a, b) => b[sortKey].localeCompare(a[sortKey])).reverse();
      this.setState({ 
        sortDirection: 'descending',
        currentPageData: sorted
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.launches !== this.props.launches){
      var currentLocation = window.location.hash; 
      if(!currentLocation){
        this.onPageData(this.state.currentPage);
      }
      else{
        var urlArray = currentLocation.split('/');
        const lastsegment = urlArray[urlArray.length-1];
        this.onPageData(lastsegment);
      }
      console.log(this.state.currentPage)
    }
  }

  render() {
    const { isLoading, error } = this.props;
    
    return (
      <div className='App'>
        <h3>Frontend React Coding Challenge - Yves CYUZUZO</h3>
        <h2>SpaceX 20 Latest launches</h2>
        {error ? <p>{error.message}</p> : null}
        <div className='container'>
          {!isLoading ?
            <div>

              <div style={{paddingBottom:"10px", float: "right"}}>
                <input
                  style={{border: "1px solid"}}
                  type="text"
                  placeholder="Search mission name"
                  onChange={ this.onSearch.bind(this) }
                />
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th onClick = { e => this.onSort(e, 'flight_number') }>Flight number</th>
                    <th onClick = { e => this.onSort(e, 'mission_name') }>mission name</th>
                    <th >rocket name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.currentPageData.map(function(launch, index) {
                    return (
                      <tr key={ index } data-item={ launch }>
                        <td >{launch.flight_number}</td>
                        <td >{launch.mission_name}</td>
                        <td >{launch.rocket_name}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {this.state.pagination && (
                <div>
                  <Pager>
                    {this.state.pageNumbers.map(number => {
                      return (
                        <Pagination.Item
                          key={ number }
                          id={ number }
                          onClick={ e => this.handleClick(e, number) }
                          href={ '#/pagination/'+number }
                          active= { number == this.state.currentPage }
                        >
                          {number}
                        </Pagination.Item>
                      );
                    })}
                  </Pager>
                </div>
              )}

            </div>
               
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


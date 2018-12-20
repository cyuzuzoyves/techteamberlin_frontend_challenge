export function fetchAllLauches() {
  const action_type = 'FETCH_LATEST_LAUNCHES'
  return dispatch => {

    dispatch({type: `${action_type}_PENDING`})
    // Fetching data from SpaceX API
    fetch('https://api.spacexdata.com/v3/launches?limit=20&launch_year=2018&order=desc')
      // We get the API response and receive data in JSON format...
      .then((response) => response.json())
      // ...then we push fetched data in our new array
      .then((data) => {
        const launchArr = [];
        data.map((launch) => launchArr.push({
          flight_number: '' +launch.flight_number,
          mission_name: launch.mission_name,
          rocket_name: launch.rocket.rocket_name
        }));
        dispatch({
          type: `${action_type}_FULFILLED`,
          payload: launchArr
        })
        //console.log(launchArr);
      })
      // Catch any errors
      .catch(err => {
        dispatch({
          type: `${action_type}_REJECTED`,
          error: err
        })        
      })
  }
}

export function latestLaunches(
  state = {
    isLoading: true
  },
  action
) {
  const action_type = 'FETCH_LATEST_LAUNCHES';
  switch (action.type) {
  
  case `${action_type}_PENDING`:
    return Object.assign({}, state, {
      isLoading: true,
      error: false
    });
  case `${action_type}_FULFILLED`:
    return Object.assign({}, state, {
      launches: action.payload,
      isLoading: false
    });
  case `${action_type}_REJECTED`:
    return Object.assign({}, state, {
      isLoading: false,
      error: action.error
    });
  default:
    return state;
  }
}
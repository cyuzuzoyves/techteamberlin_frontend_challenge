import { combineReducers } from 'redux';
import { latestLaunches } from './reducer';

import { reducer as formReducer } from 'redux-form';

const reducersList = combineReducers({
  // routes,
  
  latestLaunches,
 
  form: formReducer.plugin({
    new_item: (state, action) => {
      // <------ 'account' is name of form given to reduxForm()
      switch (action.type) {
      case 'RESET_FORM':
        return undefined; // <--- blow away form data
      default:
        return state;
      }
    }
  })
});

export default reducersList;

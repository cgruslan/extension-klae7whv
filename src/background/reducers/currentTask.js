import * as types from '../constants/ActionTypes';

export default (state = '', action) => {
  switch (action.type) {
    case types.SET_CURRENT_TASK:
      return action.task;

    default:
      return state;
  }
};

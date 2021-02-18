import * as types from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.SET_BUSINESSES:
      return action.businesses;

    case types.ADD_BUSINESSES:
      return [
        ...state,
        ...action.businesses,
      ];

    default:
      return state;
  }
};

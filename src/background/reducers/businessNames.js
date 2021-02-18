import * as types from '../constants/ActionTypes';

export default (state = [], action) => {
  switch (action.type) {
    case types.SET_BUSINESS_NAMES:
      return action.names;

    case types.ADD_BUSINESS_NAMES:
      return [
        ...new Set([
          ...state,
          ...action.names,
        ]),
      ];

    default:
      return state;
  }
};

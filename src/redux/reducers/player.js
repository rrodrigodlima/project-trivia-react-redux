import { ADD_ASSERTIONS, ADD_POINTS, ADD_USER, RESET_POINTS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_USER:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  case ADD_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case RESET_POINTS:
    return {
      ...state,
      score: 0,
    };
  case ADD_ASSERTIONS:
    return {
      ...state,
      assertions: action.payload + 1,
    };
  default:
    return state;
  }
};
export default playerReducer;

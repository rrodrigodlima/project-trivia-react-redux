import { ADD_POINTS, ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
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
  default:
    return state;
  }
};
export default playerReducer;

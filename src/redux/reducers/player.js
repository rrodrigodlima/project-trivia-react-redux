import { ADD_CORRECT_CHOICES, ADD_POINTS, ADD_USER } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  correctChoices: 0,
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
  case ADD_CORRECT_CHOICES:
    return {
      ...state,
      correctChoices: action.payload + 1,
    };
  default:
    return state;
  }
};
export default playerReducer;

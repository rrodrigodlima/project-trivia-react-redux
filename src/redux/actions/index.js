export const ADD_USER = 'ADD_USER';
export const ADD_POINTS = 'ADD_POINTS';
export const RESET_POINTS = 'RESET_POINTS';
export const ADD_ASSERTIONS = 'ADD_ASSERTIONS';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addPoints = (points) => ({
  type: ADD_POINTS,
  payload: points,
});

export const resetPoints = () => ({
  type: RESET_POINTS,
});

export const addAssertions = (assertions) => ({
  type: ADD_ASSERTIONS,
  payload: assertions,
});

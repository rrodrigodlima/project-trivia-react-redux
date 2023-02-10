export const ADD_USER = 'ADD_USER';
export const ADD_POINTS = 'ADD_POINTS';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addPoints = (points) => ({
  type: ADD_POINTS,
  payload: points,
});

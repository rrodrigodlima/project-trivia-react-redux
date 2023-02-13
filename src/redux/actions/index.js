export const ADD_USER = 'ADD_USER';
export const ADD_POINTS = 'ADD_POINTS';
export const ADD_CORRECT_CHOICES = 'ADD_CORRECT_CHOICES';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const addPoints = (points) => ({
  type: ADD_POINTS,
  payload: points,
});

export const addCorrectChoices = (correctChoices) => ({
  type: ADD_CORRECT_CHOICES,
  payload: correctChoices,
});

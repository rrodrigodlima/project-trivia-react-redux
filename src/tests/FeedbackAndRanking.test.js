import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import { cleanup, waitFor } from '@testing-library/react';

const { click, type } = userEvent;
afterEach(cleanup);

test('Cobertura de 90% da page Feedback', async () =>{
  const {
    getByText,
    getByTestId,
    getAllByTestId,
    getByAltText,
    history,
  } = renderWithRouterAndRedux(<App />);

  let nameInput = getByText('Nome:');
  let emailInput = getByText('Email:');
  let buttonPlay = getByText('Play');
  click(nameInput);
  type(nameInput, 'Claudio');
  click(emailInput);
  type(emailInput, 'claudio@trybe.com');
  click(buttonPlay);
  await waitFor(() =>{
    for (let index = 0; index < 5; index += 1) {
      const correctAnswer = getByTestId('correct-answer');
      click(correctAnswer);
      const nextButton = getByText('Next');
      click(nextButton);
    }
    const againButton = getByText('Play Again');
    click(againButton);
    expect(global.window.location.pathname).toBe('/');
  });

  nameInput = getByText('Nome:');
  emailInput = getByText('Email:');
  buttonPlay = getByText('Play');
  click(nameInput);
  type(nameInput, 'Robson');
  click(emailInput);
  type(emailInput, 'robson@trybe.com');
  click(buttonPlay);
  await waitFor(() =>{
    for (let index = 0; index < 5; index += 1) {
      if (index === 3 || index === 4) {
        const correctAnswer = getByTestId('correct-answer');
        click(correctAnswer);
      } else {
        const incorrectAnswer = getAllByTestId(/wrong-answer/);
        click(incorrectAnswer[0]);
      }
      const nextButton = getByText('Next');
      click(nextButton);

    }
    const rankingButton = getByText('Ranking');
    click(rankingButton);
    expect(global.window.location.pathname).toBe('/ranking');
  });
  const playerPicture = getByAltText('Robson');
  expect(playerPicture).toHaveAttribute('src', 'https://www.gravatar.com/avatar/ab99af4b3cb77861d5a5ee2a01d6b5d2');

  const goBack = getByText('Voltar para o início');
  click(goBack);
  expect(global.window.location.pathname).toBe('/');
});

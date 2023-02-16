import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import {  waitFor } from '@testing-library/react';

test('Cobertura de 90% da page Login', async () =>{
  const {
    getByText,
    getByTestId,
    history,
  } = renderWithRouterAndRedux(<App />);

  const nameInput = getByText('Nome:');
  const emailInput = getByText('Email:');
  const buttonPlay = getByText('Play');
  const buttonSettings = getByTestId('btn-settings');
  userEvent.click(nameInput);
  userEvent.type(nameInput, 'Claudio');
  userEvent.click(emailInput);
  userEvent.type(emailInput, 'claudio@trybe.com');
  expect(buttonPlay).toBeInTheDocument();
  userEvent.click(buttonPlay);
  await waitFor(() =>{
    expect(global.window.location.pathname).toBe('/game');
  }, { timeout: 4000 });
});

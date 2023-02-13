import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import { cleanup, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

afterEach(cleanup);

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
  userEvent.click(buttonPlay);
  expect(buttonPlay).toBeInTheDocument();
  await waitFor(() =>{
    expect(global.window.location.pathname).toBe('/game');
  });
});

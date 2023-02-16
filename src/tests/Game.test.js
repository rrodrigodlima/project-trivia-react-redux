import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import { waitFor } from '@testing-library/react';
import App from '../App';


describe('', () => {
  afterEach(() => jest.resetAllMocks());
  
  test('Passando token inválido', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => ({ response_code: 3 })
    }));
  
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
    }, {timeout:4000});
    await waitFor(() =>{
      expect(global.window.location.pathname).toBe('/');
    }, {timeout:4000});
  });
});

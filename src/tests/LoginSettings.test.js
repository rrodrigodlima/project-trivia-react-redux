import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import App from '../App'
import userEvent from '@testing-library/user-event';
import { cleanup, waitFor } from '@testing-library/react';

afterEach(cleanup);

test('Cobertura de 90% da Page Login', async () =>{
  const {
    getByTestId,
    history,
  } = renderWithRouterAndRedux(<App />);
  const buttonSettings = getByTestId('btn-settings');
  userEvent.click(buttonSettings);
  
  await waitFor(() =>{
    expect(global.window.location.pathname).toBe('/settings');
  });

});

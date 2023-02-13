import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import userEvent from '@testing-library/user-event';
import {screen, cleanup, act, waitFor} from '@testing-library/react';
import Game from '../pages/Game';
import App from '../App';

afterEach(cleanup);

test('Espera 32 segundos', () => {
  jest.useFakeTimers();
  renderWithRouterAndRedux(<Game />);
  act(() => {
    jest.advanceTimersByTime(32 * 1000);
  });
});

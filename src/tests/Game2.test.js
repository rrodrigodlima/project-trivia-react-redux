import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { act } from '@testing-library/react';
import Game from '../pages/Game';

describe('', () => {
  afterEach(() => jest.resetAllMocks());

  test('Espera 32 segundos', () => {
    jest.useFakeTimers();
    renderWithRouterAndRedux(<Game />);
    act(() => {
      jest.advanceTimersByTime(32 * 1000);
    });
  });
});

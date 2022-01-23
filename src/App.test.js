import React from 'react';
import App from './App';
import {
  render,
  screen,
  userEvent,
  waitForElementToBeRemoved,
} from './utils/test-utils';

it('renders search results for 23', async () => {
  render(<App />);
  const expected = ['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'];

  const numberTBox = screen.getByLabelText('Number:');

  userEvent.type(numberTBox, '23');

  await screen.findByRole('progressbar');
  await waitForElementToBeRemoved(screen.queryByRole('progressbar'));

  expected.forEach((e) => {
    expect(screen.getByText(e)).toBeInTheDocument();
  });
});

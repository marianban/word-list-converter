import { rest } from 'msw';
import { apiWordsUrl } from '../constants.mjs';

export const handlers = [
  rest.get(apiWordsUrl + '/*', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(['ad', 'ae', 'af', 'bd', 'be', 'bf', 'cd', 'ce', 'cf'])
    );
  }),
];

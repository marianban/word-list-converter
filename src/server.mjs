import http from 'http';
import { WordListConverter } from './WordListConverter.mjs';
import { apiWordsUrl } from './constants.mjs';

const port = 3001;
const wordListRoute = `${apiWordsUrl}/`;

const requestHandler = (request, response) => {
  if (request.method === 'GET' && request.url.startsWith(wordListRoute)) {
    const lastUrlSegment = request.url.substring(wordListRoute.length);

    // fails for more chars on JSON.stringify(result)
    // can be fixed by using server side pagination
    if (lastUrlSegment.length >= 15) {
      response.statusCode = 400;
      response.end();
      return;
    }

    const converter = new WordListConverter();
    const result = converter.convert(lastUrlSegment);

    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(result));
  } else {
    response.statusCode = 404;
    response.end();
  }
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }

  console.log(`server is listening on http://localhost:${port}`);
});

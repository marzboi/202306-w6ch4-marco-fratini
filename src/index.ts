import http from 'http';
import url from 'url';
import * as dotenv from 'dotenv';

dotenv.config();

const sum = (a: number, b: number) => a + b;
const rest = (a: number, b: number) => a - b;
const multiplication = (a: number, b: number) => a * b;
const division = (a: number, b: number) => a / b;

const PORT = process.env.PORT || 4444;

const server = http.createServer((request, response) => {
  if (!request.url) {
    server.emit('error', new Error('No url in the request'));
    return;
  }

  const { pathname, query } = url.parse(request.url);

  if (pathname !== '/calculator') {
    server.emit('error', new Error('Error 404'));
    response.write(`<h1>Error 404</h1><h2>Path not found</h2>`);
    response.end();
    return;
  }

  if (!query) {
    server.emit('error', new Error('No Numbers dawg'));
    response.write(`<h1>Error!</h1><h2>No Numbers dawg</h2>`);
    response.end();
    return;
  }

  const params = query.split(/=|&/g);
  const numberParams = params
    .filter((item) => !isNaN(Number(item)))
    .map(Number);
  console.log(numberParams);

  if (numberParams.length <= 1) {
    server.emit(
      'error',
      new Error('Nice but provider numbers now not letters')
    );
    response.write(
      `<h1>Error!</h1><h2>Nice but provider numbers now not letters</h2>`
    );
    response.end();
    return;
  }

  response.write(`<h1>Hello ${pathname}</h1>`);
  response.write(
    `<p>The sum of ${numberParams[0]} and ${numberParams[1]} is ${sum(
      numberParams[0],
      numberParams[1]
    )}</p>`
  );
  response.write(
    `<p>The substraction of ${numberParams[0]} and ${numberParams[1]} is ${rest(
      numberParams[0],
      numberParams[1]
    )}</p>`
  );
  response.write(
    `<p>The multiplication of ${numberParams[0]} and ${
      numberParams[1]
    } is ${multiplication(numberParams[0], numberParams[1])}</p>`
  );
  response.write(
    `<p>The division of ${numberParams[0]} and ${numberParams[1]} is ${division(
      numberParams[0],
      numberParams[1]
    )}</p>`
  );
  response.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

server.on('error', (error) => {
  console.log(error.message);
});

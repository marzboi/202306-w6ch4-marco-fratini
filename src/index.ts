import http from 'http';
import * as dotenv from 'dotenv';
import { program } from 'commander';
import url from 'url';

dotenv.config();

const PORT = process.env.PORT || 6969;

const server = http.createServer((request, response) => {
  program.parse();
  if (!request.url) return console.log('Its over');
  url.parse(request.url);
  response.write(`Hola ${request.url}`);
  response.write(request.method);
  response.write(request.url);
  response.end();
});

server.listen(PORT);

server.on('listening', () => {
  console.log('Listening on port ' + PORT);
});

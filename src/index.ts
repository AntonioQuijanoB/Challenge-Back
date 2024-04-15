import { createServer } from 'http';
import createDebug from 'debug';
import 'dotenv/config';
import { createApp } from './app.js';

const debug = createDebug('W7E:server');
debug('Starting server');

const port = process.env.PORT ?? 3000;
const server = createServer(createApp());
server.listen(port);

server.on('error', (error) => {
  debug('Error:', error);
  process.exit(1);
});

server.on('listening', () => {
  debug(`Server Express is running http://localhost:${port}`);
});

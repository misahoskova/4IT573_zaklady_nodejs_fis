import http from 'http';
import fs from 'fs';
import path from 'path';

import chalk from 'chalk';

const PORT = 3000;
const INDEX_FILE = path.join(process.cwd(), 'index.html');

http
  .createServer((req, res) => {
    fs.readFile(INDEX_FILE, (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  })
  .listen(PORT, () => {
    console.log(chalk.green(`Server is running on http://localhost:${PORT}`));
  });

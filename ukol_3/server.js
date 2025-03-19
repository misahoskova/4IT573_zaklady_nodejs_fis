import chalk from 'chalk';
import http from 'http';
import fs from 'fs/promises';

const FILE_PATH = 'counter.txt';
const PORT = 3000;

async function getCounterValue() {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf8');
    return parseInt(data, 10) || 0;
  } catch (error) {
    console.error(chalk.red('Chyba při čtení souboru:'), error);
    await fs.writeFile(FILE_PATH, '0', 'utf8');
    return 0;
  }
}

async function updateCounter(increment) {
  try {
    let counter = await getCounterValue();
    counter += increment;
    await fs.writeFile(FILE_PATH, counter.toString(), 'utf8');
    return counter;
  } catch (error) {
    console.error(chalk.red('Chyba při aktualizaci souboru:'), error);
    throw error;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Za lomítko zadejte increase, decrease nebo read.');
    } else if (req.url === '/increase') {
      await updateCounter(1);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    } else if (req.url === '/decrease') {
      await updateCounter(-1);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('OK');
    } else if (req.url === '/read') {
      const counter = await getCounterValue();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(counter.toString());
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  } catch (error) {
    console.error(chalk.red('Chyba na serveru:'), error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Interní chyba serveru');
  }
});

server.listen(PORT, () => {
  console.log(chalk.green(`Server běží na http://localhost:${PORT}`));
});

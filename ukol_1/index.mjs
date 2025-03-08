import fs from 'fs';

const readFile = (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
};

const writeFile = (name, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(name, data, 'utf8', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

readFile('instrukce.txt').then((instrukce) => {
  const [input, output] = instrukce.split(' ');
  console.log(input + ' - ' + output);
});

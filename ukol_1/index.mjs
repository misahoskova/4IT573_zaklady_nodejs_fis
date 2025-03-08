import fs from 'fs';

const readFile = (name) => {
  return new Promise((resolve, reject) => {
    fs.readFile(name, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          reject(new Error(`File not found: ${name}`));
        } else {
          reject(err);
        }
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

readFile('instrukce.txt')
  .then((instrukce) => {
    const [input, output] = instrukce.trim().split(' ');
    console.log(`Reading: ${input}, writing to: ${output}`);

    return readFile(input).then((inputText) => {
      console.log('Input file:', inputText);
      return writeFile(output, inputText);
    });
  })
  .then(() => {
    console.log('Output file has been saved!');
  })
  .catch((err) => {
    if (err.message.startsWith('File not found')) {
      console.error(err.message);
    } else {
      console.error('Error:', err);
    }
  });

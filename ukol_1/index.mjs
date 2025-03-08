import fs from 'fs/promises';

const readFile = async (name) => {
  try {
    return await fs.readFile(name, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`File not found: ${name}`);
    } else {
      throw err;
    }
  }
};

const writeFile = async (name, data) => {
  try {
    await fs.writeFile(name, data, 'utf8');
  } catch (err) {
    throw new Error(`Failed to write file: ${name}`);
  }
};

const processFiles = async () => {
  try {
    const instrukce = await readFile('instrukce.txt');
    const [input, output] = instrukce.trim().split(' ');

    console.log(`Reading: ${input}, writing to: ${output}`);

    const inputText = await readFile(input);
    console.log('Input file:', inputText);

    await writeFile(output, inputText);
    console.log('Output file has been saved!');
  } catch (err) {
    console.error(err.message);
  }
};

processFiles();

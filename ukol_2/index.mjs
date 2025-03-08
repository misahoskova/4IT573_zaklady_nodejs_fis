import fs from 'fs/promises';

const readFile = async (name) => {
  try {
    return await fs.readFile(name, 'utf-8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File ${name} not found`);
    } else {
      throw error;
    }
  }
};

const writeFile = async (name, data) => {
  try {
    return await fs.writeFile(name, data, 'utf-8');
  } catch (err) {
    throw new Error(`Error writing to file ${name}`);
  }
};

const processFile = async () => {
  try {
    const instruction = await readFile('instrukce.txt');
    const n = parseInt(instruction.trim(), 10);
    if (isNaN(n) || n < 0) {
      throw new Error('Invalid number');
    }

    console.log(`Creating ${n} files...`);

    const filePromises = Array.from({ length: n + 1 }, (_, i) => {
      return writeFile(`${i}.txt`, `File ${i}`);
    });

    await Promise.all(filePromises);

    console.log('Successfully DONE');
  } catch (err) {
    console.log(`Error: ${err.message}`);
  }
};

processFile();

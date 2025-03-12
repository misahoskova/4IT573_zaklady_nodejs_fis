// 1.
// import fs from 'fs';

// const readFile = (name) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(name, 'utf8', (err, data) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve(data.toString());
//             }
//         });
//     })
// }

// const writeFile = (name, data) => {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(name, data, 'utf8', (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve();
//             }
//         });
//     })
// }

// readFile('third.txt')
// .then((third) => {
//     const [a, b] = third.trim().split('\n');
//     console.log(a + " - " + b);
// });

// 2.
// import fs from 'fs/promises';

// fs.readFile('third.txt', 'utf8').then((result) => {
//     console.log(result.toString());
// });


// 3. AWAIT
// import fs from 'fs/promises';

// const filenames = ['first.mjs', 'third.txt'];

// for(const filename of filenames) {
//     const content = await fs.readFile(filename, 'utf8');

//     console.log(content.toString());
// }

// console.log('Done!');


// 4. ASYNC
import fs from 'fs/promises';

const readFileAndPrinttToConsole = async (name) => {
    const data = await fs.readFile(name, 'utf8');
    console.log(data.toString());
}

readFileAndPrinttToConsole('third.txt');
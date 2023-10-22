const fs = require('fs').promises;
const http = require('http');
const url = require('url');
const catalogue = require('./API/catalogue.json');

const PORT = 3000;

const server = http.createServer(async function (req, res) {
    if (req.method === 'POST' && req.url === 'api/catalogue.json') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                // Опрацьовуйте дані та зберігайте їх у каталозі, наприклад, catalogue.json
                // Переконайтеся, що у вас існує файлий з такою назвою та обробляйте дані відповідним чином.

                // Наприклад, можна додати отримані дані до catalogue.json
                catalogue.push(data);
                await fs.writeFile('API/catalogue.json', JSON.stringify(catalogue));

                res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500/UA-1039-Samokhvalov/add-form');
                res.setHeader('Access-Control-Allow-Methods', 'POST');
                res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Замініть це на домен вашого клієнта
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
            } catch (error) {
                res.writeHead(400, { 'Content-Type': 'text/plain' });
                res.end('Помилка при обробці запиту.');
            }
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Сторінку не знайдено.');
    }
});

server.listen(PORT);
console.log(`Сервер працює на порті ${PORT}`);
// async function start() {
//     console.log('STARTED');
//     await fs.writeFile('test.txt', 'hello world');
//     console.log('end of writing');
//     const data = await fs.readFile('./API/catalogue.json', 'utf8');
//     console.log(data);
// }
// start();

// ===================================================================================== Код для роботи без .promises

// fs.writeFile('test.txt', 'hello world', () => {
//     console.log('end of writing');
//     fs.readFile('./API/catalogue.json', 'utf8', (err, data) => {
//         console.log(data);
//         console.log('end');
//     });
// });




// ===================================================================================== Приклад обробки JSON файлу.
/* const server = http.createServer(function(req, res) { 
    res.writeHead(200, {'Content-type' : 'text/html'});
    res.write('<h1>Names:</h1>');
    catalogue.forEach(item =>{
        res.write(`<li>${item.name}</li>`);
    })
    res.end(`</ul>`);
});
*/
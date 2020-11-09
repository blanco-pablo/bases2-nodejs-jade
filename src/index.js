const app = require('./app');

async function main() {
    await app.listen(3000);
    console.log('SERVER ON 3000');
}

main();
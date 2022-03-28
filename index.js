const http = require("http");

const routes = require('./routes/index.js')

const server = http.createServer((req, res) => {
    console.log('Serveur lancé');
    const route = new routes(req,res)
});
server.listen(3000)

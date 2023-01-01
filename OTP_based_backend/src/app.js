const express = require('express')
const path = require('path');
const cors = require('cors')
const app = express();

require('dotenv').config();
const {HOST_API, PORT_API} = process.env;

//* Middlewares
app.use(cors({
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}));

app.use(express.json());
app.use((req, res, next) => {
    console.log('\x1b[37m\x1b[42m ' + req.method + ' \x1b[0m ' + req.url);
    next()
});

//* Rotas
app.use('/user', require('./routes/userRoutes'));

// rota de introdução, apresenta um html bonitinho só
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT_API, () => {
    console.log(`Server online on: ${HOST_API}:${PORT_API}`)
});
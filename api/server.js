const express = require('express');

// const helmet = require('helmet');

const actionRouter = require('./routers/actionRouter');
const projectRouter = require('./routers/projectRouter');

const server = express();

server.use(express.json(), logger);

// server.use('/api/projects', projectRouter);
// server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    const message = process.env.MSG || "Hello, this is your Sprint Challenge"
    res.json({ message });
});

//custom middleware

function logger(req, res, next) {
    const newDate = new Date(Date.now());
    console.log((`${req.method} to ${req.originalUrl} at ${newDate.toDateString()}, ${newDate.toTimeString()}`))
    next();
};

module.exports = server;
const app = require('express')(),
      http = require('http').createServer(app),
      io = require('socket.io')(http),
      port = process.env.port || 8010;

http.listen(port, () => {
    console.log('Trasmitiendo por el puerto' + port);
})

app.get('/live', (req, res) => {
    res.sendFile(__dirname + "/public/cliente.html");
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/server.html");
})

io.on('connection', (socket) => {
    socket.on('streaming', (img) => {
        io.emit('watching', img);
        console.log(img);
    });
});

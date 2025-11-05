const io = require("socket.io")(8000, {
    cors: {
        origin: "*",
    }
});

const users = {};

io.on('connection', socket => {   //io.on hai wo instance hai ki x user connect hua a user etc
    socket.on('new-user-joined', name => {// socket.on jab bhi koi perticular connection ke saath kuch hoga to us uss particular ke saath kya hona chaiye ye dekhega 
        
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); // (broadcast.emit) ye sare users ko batayega ki naya user join hua hai
        
    });

    socket.on('send', message => {
        
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });
        socket.on('disconnect', message => {
        
            socket.broadcast.emit('left', users[socket.id]);
            delete users[socket.id];
    })
});

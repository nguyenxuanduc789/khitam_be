'use strict'



class SocketService {
    connection(socket) {

        socket.on('join', (user_id) => {
           
        })

       
        socket.on('disconnect', () => {
            global._onlineUsers.delete(socket.id);
            console.log(`User disconnect id is ${socket.id}`)
        })
    }


}
//const loggerService = new LoggerService();

module.exports = new SocketService();       
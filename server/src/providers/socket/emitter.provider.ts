import { Message } from '../../interface/message.interface'
import { io } from './socket.provider'

io.on('connect', socket => {
  console.log(`new user connected to socket ${socket.id}`)
})

function broadcast_message(to: string, message: Message) {
  io.to(to).emit('chat:new_message', message)
}

export {
  broadcast_message
}
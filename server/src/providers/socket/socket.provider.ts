import http  from 'http'
import express from 'express'
import { Server } from 'socket.io'

const socketApp = express()
const socketProvider = http.createServer(socketApp)
const io = new Server(socketProvider)

export { io, socketProvider }
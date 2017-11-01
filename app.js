import msgModel from './models/message'
import db from './mongodb/db'
import express from 'express'
import api from './router/index'
const app = express()

app.use(express.static('./public'))
api(app)

import http from 'http'
const server = http.createServer(app)

import socket from 'socket.io'
const io = socket(server)

const port = 3000

server.listen(port, () => {
  console.log('Server listening at port 3000')
})

const users = {}

io.on('connection', socket => {
  console.log('connect socket success')
  socket.on("chat", (data) => {
    console.log(data)
    let msg = new msgModel(data)
    msg.save((err, doc) => {
      if (err) {
        console.log('保存聊天记录错误:' + err)
      } else {
        console.log(doc.content)
      }
    })
    io.emit('boradChat', data)
  })
})
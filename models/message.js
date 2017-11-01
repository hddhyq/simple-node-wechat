import mongoose from 'mongoose'

const Schema = mongoose.Schema

const msgSchema = new Schema({
  name: String,
  createTime: Number,
  avatar: {
    type: String,
    default: 'default.jpg'
  },
  content: String
})

const MsgModel = mongoose.model('Msg', msgSchema)

// const msg1 = new MsgModel({
//   name: 'hdd',
//   time: '2017-10-22',
//   content: 'hello world!'
// })

// msg1.save((err, doc) => {
//   if (err) {
//     console.log('保存聊天记录错误:' + err)
//   } else {
//     console.log(doc.content)
//   }
// })

export default MsgModel
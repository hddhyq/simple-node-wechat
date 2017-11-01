import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  avatar: {
    type: String,
    default: 'default.jpg'
  }
})

const UserModel = mongoose.model('User', userSchema)

export default UserModel
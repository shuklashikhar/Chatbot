import { randomUUID } from 'crypto';
import mongoose, { trusted } from 'mongoose';

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID()
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },

})

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  chats: [chatSchema]
})

userSchema.index({email: 1}, {unique: true});

const user = mongoose.model('user', userSchema);


export default user

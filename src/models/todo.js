// @flow
import mongoose from 'mongoose';

const { Schema: MongoSchema } = mongoose;

export type TodoType = {
  id: string,
  user: string,
  title: string,
  checked: boolean,
};

const mongoSchema = new MongoSchema({
  user: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  checked: {
    type: Boolean,
    required: true,
  },
});

const Todo = mongoose.model('todo', mongoSchema);

export default Todo;

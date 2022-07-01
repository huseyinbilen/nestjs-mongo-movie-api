import * as mongoose from 'mongoose';

export const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true
  }
});


export interface Movie extends mongoose.Document {
    id: string,
    name: string
    description: string,
    score: number
};
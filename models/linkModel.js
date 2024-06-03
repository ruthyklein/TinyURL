import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema({
  insertedAt: { type: Date, default: Date.now },
  ipAddress: { type: String, required: true }
});

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [clickSchema],
  targetParamName: { type: String, default: 't' },
  targetValues: [
    {
      name: { type: String },
      value: { type: String }
    }
  ]
});

const Link = mongoose.model('Link', linkSchema);
export default Link;

import mongoose, { Document, Model } from 'mongoose';

interface IRoomType extends Document {
  name: string;
  description: string;
}

const roomTypeSchema = new mongoose.Schema<IRoomType>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const RoomType: Model<IRoomType> = mongoose.model('RoomType', roomTypeSchema);

export default RoomType;
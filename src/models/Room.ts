import mongoose, { Document, Model } from 'mongoose';

interface IRoom extends Document {
  name: string;
  price: number;
}

const roomSchema = new mongoose.Schema<IRoom>({
  name: String,
  price: Number
});

const Room: Model<IRoom> = mongoose.model('Room', roomSchema);

const roomsData = [
  {
    name: 'Deluxe Room',
    price: 20000
  },
  {
    name: 'Standard Room',
    price: 10000
  },
  {
    name: 'Economy Room',
    price: 5000,
  }
];

Room.create(roomsData)
  .then(() => console.log('Rooms created successfully'))
  .catch(err => console.error(err));

export default Room;
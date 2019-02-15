import mongoose from "mongoose";

const schema = new mongoose.Schema({
  saved_ts: Number,
  value: Number
});

const MongooseMessage = (coll: string): mongoose.Model<mongoose.Document> =>
  mongoose.model("model", schema, coll);
export default MongooseMessage;

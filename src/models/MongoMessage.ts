import { MongooseDocument } from "mongoose";
export class MongoMessage extends MongooseDocument {
  value: { type: number };
}

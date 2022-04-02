//IMPORT MONGOOSE
import mongoose, { Model } from "mongoose"

// CONNECTING TO MONGOOSE (Get Database Url from .env.local)
const { DATABASE_URL } = process.env

// connection function
export const connect = async () => {
  const conn = await mongoose
    .connect(DATABASE_URL as string)
    .catch(err => console.log(err))
  console.log("Mongoose Connection Established")

  // OUR TODO SCHEMA
  const ItemSchema = new mongoose.Schema({
    title: String,
    img: String,
    id: String,
  },
  {
    timestamps: true
  })

  // OUR TODO MODEL
  const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema)

  return { conn, Item }
} 
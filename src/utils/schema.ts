import mongoose from "mongoose";
const Schema = mongoose.Schema
const BlogSchema = new Schema({
    title: String,
    description: String,
    date: String,
    tags: [String],
    content: String,
})
export const BlogModel = mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
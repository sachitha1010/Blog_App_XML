import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // image: {
  //   type: String,
  // },
  category:{
    type:String,
    enum:['travel','food','entertainment'],
    required:true
  }
});

export default mongoose.model("Blog", blogSchema);

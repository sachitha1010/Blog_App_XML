import express,{ json } from "express";
import cors from "cors";

import { connect } from "mongoose";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
app.use(json());
app.use(cors());

const PORT = process.env.PORT || 3001;

connect("mongodb+srv://sachitha:sachitha@cluster0.caqz5vq.mongodb.net/?retryWrites=true&w=majority");

app.use("/api/blog",blogRoutes);

app.listen(PORT,()=> {
    console.log(`Server is running on port: ${PORT}`);
})

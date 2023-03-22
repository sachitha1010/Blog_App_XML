import { Router } from "express";
import Blog from "../models/Blog.js";

const router = Router();

router.get("/", async (req, res) => {
    try {
      const blog= await Blog.find({});
      if (!blog) {
        return res.status(404).json({ error: "Not Found" });
      } else {
        res.status(200).json(blog);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/travel", async (req, res) => {
    try {
      const blog= await Blog.find({
        category: "travel",
      });
      if (!blog) {
        return res.status(404).json({ error: "Not Found" });
      } else {
        res.status(200).json(blog);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });
  

  router.post("/",async (req,res)=>{
      const blog =req.body
      const newblog=new Blog(blog);
      await newblog.save();
      res.json(blog);
  });

  router.put("/update/:id", async (req, res) => {
    try {
      const blog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, {
        new: true,
      });
      if (!blog) {
        return res.status(404).json({ error: "Not Found" });
      } else {
        res.status(200).json(blog);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  router.delete("/delete/:id", async (req, res) => {
    try {
      const blog = await Blog.findByIdAndRemove({ _id: req.params.id }).exec();
      if (!blog) {
        return res.status(404).json({ error: "Not Found" });
      } else {
        res.status(200).json(blog);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });
  
export default router;
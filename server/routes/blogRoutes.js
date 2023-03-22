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


router.put("/updatetitle/:id",async(req,res)=>{
    const newTitle=req.body.newTitle;
    const id=req.params.id;
    try{
      await Blog.findById(id,(updatedblog)=>{
        updatedblog.title=newTitle;
        updatedblog.save();
        res.send("updatetitle/:id");
      });
    }catch(err){
      console.log(err);
    }
  });

  router.delete("/delete/:id",async(req,res)=>{
    const id=req.params.id;
    await Blog.findByIdAndRemove(id).exec();
    res.send("deleted");
  });

export default router;
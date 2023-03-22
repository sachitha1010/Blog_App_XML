import { Router } from "express";
import Blog from "../models/Blog.js";
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
  destination:(req,file,callback) =>{
    callback(null,"../client/public/uploads/");
  },
    filename:(req,file,callback)=>{
      callback(null,file.originalname);
    }
})

const upload = multer({storage: storage});
  //get request - retrieve data
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

  //get request based on a specific category
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
  
  //post - post data into db
  router.post("/add", upload.single("image"), async (req, res) => {
    try {
      // const blog= await Blog.create(req.body);
      const blog = new Blog({
        title: req.body.title,
        description:req.body.description,
        category : req.body.category,
        image: req.file.originalname
      });
      await blog.save();
      res.status(201).json({ blog: blog._id });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  });

  //put request-update already existing data
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
  
  //delete request-delete data from db
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
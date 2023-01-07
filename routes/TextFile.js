import express from "express";
import { createTextFile, deleteTextFile, getTextFile, getTextFileDetail, updateTextFile } from "../controllers/TextFile.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();

router.post("/addtxt",isAuthenticated,createTextFile);

router.get("/txt",isAuthenticated,getTextFile);

router.get("/txt/:id",isAuthenticated,getTextFileDetail);

router.put("/txt/:id",isAuthenticated,updateTextFile);

router.delete("/txt/:id",isAuthenticated,deleteTextFile);




export default router;

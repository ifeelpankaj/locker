import express from "express";
import {
  addPrivateDocs,
  addPublicDocs,
  deleteDoc,
  getAdminDocs,
  getDocDetails,
  getMyDocs,
  getMyPrivateDocs,
} from "../controllers/Locker.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

//public doc route

router.post("/createdoc", isAuthenticated, addPublicDocs);

router.get("/mydocs", isAuthenticated, getMyDocs);

router.get("/mydocs/:id", isAuthenticated, getDocDetails);

router.delete("/mydocs/:id", isAuthenticated, deleteDoc);

router.get("/admin/docs", isAuthenticated, authorizeAdmin, getAdminDocs);

//private doc route

router.post("/createprivatedoc", isAuthenticated, addPrivateDocs);

router.get("/myprivatedocs", isAuthenticated, getMyPrivateDocs);

router.get("/myprivatedocs/:id", isAuthenticated, getDocDetails);

router.delete("/myprivatedocs/:id", isAuthenticated, deleteDoc);

router.get("/admin/privatedocs", isAuthenticated, authorizeAdmin, getAdminDocs);

export default router;

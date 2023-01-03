import express from "express";
import {
  addInfo,
  deleteInfo,
  getInfoDetails,
  getMyInfo,
  updateAccessingLink,
  updateProjectName,
} from "../controllers/Info.js";
import {
  addProject,
  getAdminProject,
  getMyProject,
  getProjectDetails,
  updateInsta,
  updateResume,
} from "../controllers/Project.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/project", isAuthenticated, addProject);

router.get("/myproject", isAuthenticated, getMyProject);

router.get("/myproject/:id", isAuthenticated, getProjectDetails);

router.get("/admin/project", authorizeAdmin, isAuthenticated, getAdminProject);

router.put("/resume/:id", isAuthenticated, updateResume);

router.put("/updateInsta/:id", isAuthenticated, updateInsta);

//Info

router.post("/info", isAuthenticated, addInfo);

router.get("/myinfo", isAuthenticated, getMyInfo);

router.get("/myinfo/:id", isAuthenticated, getInfoDetails);

router.put("/updateProjectName/:id", isAuthenticated, updateProjectName);

router.delete("/delete/:id", isAuthenticated, deleteInfo);

router.put("/updateAccessingLink/:id", isAuthenticated, updateAccessingLink);

export default router;

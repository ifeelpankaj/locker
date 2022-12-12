import express from "express";
import {
  addProject,
  getAdminProject,
  getMyProject,
  getProjectDetails,
  updateAccessingLink,
  updateInsta,
  updateProjectName,
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

router.put("/updateProjectName/:id", isAuthenticated, updateProjectName);

router.put("/updateAccessingLink/:id", isAuthenticated, updateAccessingLink);

export default router;

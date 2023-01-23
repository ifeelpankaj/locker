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
  deleteProject,
  getAdminProject,
  getMyProject,
  getProjectDetails,
  updateInfo,
} from "../controllers/Project.js";
import { authorizeAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/project", isAuthenticated, addProject);

router.get("/myproject", isAuthenticated, getMyProject);

router.get("/myproject/:id", isAuthenticated, getProjectDetails);

router.get("/admin/project", authorizeAdmin, isAuthenticated, getAdminProject);

router.put("/updateProject/:id", isAuthenticated, updateProjectName);

router.put("/info/:id", isAuthenticated, updateInfo);

router.delete("/remove/:id", isAuthenticated, deleteProject);
//Info

router.post("/info", isAuthenticated, addInfo);

router.get("/myinfo", isAuthenticated, getMyInfo);

router.get("/myinfo/:id", isAuthenticated, getInfoDetails);

router.delete("/delete/:id", isAuthenticated, deleteInfo);

router.put("/updateAccessingLink/:id", isAuthenticated, updateAccessingLink);

export default router;

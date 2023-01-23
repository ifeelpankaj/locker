import { asyncError } from "../middlewares/errorMiddleware.js";
import { Project } from "../models/Project.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

//add Project
export const addProject = asyncError(async (req, res, next) => {
  let resumes = [];

  if (typeof req.body.resumes === "string") {
    resumes.push(req.body.resumes);
  } else {
    resumes = req.body.resumes;
  }

  const resumesLinks = [];

  for (let i = 0; i < resumes.length; i++) {
    const result = await cloudinary.v2.uploader.upload(resumes[i], {
      folder: "Projects",
      resource_type: "auto",
    });

    resumesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.resumes = resumesLinks;
  req.body.user = req.user._id;

  const project = await Project.create(req.body);

  res.status(201).json({
    success: true,
    message: "Completed ",
    project,
  });
});

//get my Project
export const getMyProject = asyncError(async (req, res, next) => {
  const myProject = await Project.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    myProject,
  });
});

// Project detail
export const getProjectDetails = asyncError(async (req, res, next) => {
  const myProject = await Project.findById(req.params.id).populate(
    "user",
    "name"
  );

  if (!myProject)
    return next(new ErrorHandler("Sorry !!! Please Try Again", 404));

  res.status(200).json({
    success: true,
    myProject,
  });
});

//get all project ---- for admin
export const getAdminProject = asyncError(async (req, res, next) => {
  const myProject = await Project.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    myProject,
  });
});

//delete
export const deleteProject = asyncError(async (req, res, next) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Error", 404));
  }

  await project.remove();

  res.status(200).json({
    success: true,
  });
});


// Update Project
export const updateInfo = asyncError(async (req, res, next) => {
  
 
  let project = await Project.findById(req.params.id);

  if (!project) {
    return next(new ErrorHandler("Notting found", 404));
  }
  // Images Start Here
  let resumes = [];

  if (typeof req.body.resumes === "string") {
    resumes.push(req.body.resumes);
  } else {
    resumes = req.body.resumes;
  }

  if (resumes !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < project.resumes.length; i++) {
      await cloudinary.v2.uploader.destroy(project.resumes[i].public_id);
    }

    const resumesLinks = [];

    for (let i = 0; i < resumes.length; i++) {
      const result = await cloudinary.v2.uploader.upload(resumes[i], {
        folder: "Projects",
        resource_type: "auto",
      });

      resumesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.resumes = resumesLinks;
  }

  project = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    project,
  });
});

// update Insta User Name
export const updateInsta = asyncError(async (req, res, next) => {
  const newInstaUserName = {
    instaUserName: req.body.instaUserName,
  };

  await Project.findByIdAndUpdate(req.params.id, newInstaUserName, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newInstaUserName,
  });
});




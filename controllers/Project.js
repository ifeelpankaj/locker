import { asyncError } from "../middlewares/errorMiddleware.js";
import { Project } from "../models/Project.js";
import ErrorHandler from "../utils/ErrorHandler.js";

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
      resource_type: "raw",
      raw_convert: "aspose",
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

// update resume
export const updateResume = asyncError(async (req, res, next) => {
  // Images Start Here
  let resumes = [];

  if (typeof req.body.resumes === "string") {
    resumes.push(req.body.resumes);
  } else {
    resumes = req.body.resumes;
  }

  if (resumes !== undefined) {
    // Deleting Images From Cloudinary
    for (let i = 0; i < resumes.length; i++) {
      await cloudinary.v2.uploader.destroy(resumes[i].public_id);
    }

    const resumesLinks = [];

    for (let i = 0; i < resumes.length; i++) {
      const result = await cloudinary.v2.uploader.upload(resumes[i], {
        folder: "Projects",
        resource_type: "raw",
        raw_convert: "aspose",
      });

      resumesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.resumes = resumesLinks;
  }

  resumes = await Project.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    resumes,
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

//update Project Name

export const updateProjectName = asyncError(async (req, res, next) => {
  const newProjectName = {
    projectName: req.body.projectName,
  };

  await Project.findByIdAndUpdate(req.params.id, newProjectName, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newProjectName,
  });
});

//update Project Name

export const updateAccessingLink = asyncError(async (req, res, next) => {
  const newAccessingLink = {
    accessinglink: req.body.accessinglink,
  };

  await Project.findByIdAndUpdate(req.params.id, newAccessingLink, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newAccessingLink,
  });
});

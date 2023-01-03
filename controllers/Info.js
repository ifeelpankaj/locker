import { asyncError } from "../middlewares/errorMiddleware.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { Info } from "../models/Info.js";

export const addInfo = asyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const inforomation = await Info.create(req.body);

  res.status(201).json({
    success: true,
    message: "Completed",
    inforomation,
  });
});

export const getMyInfo = asyncError(async (req, res, next) => {
  const myInfo = await Info.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    myInfo,
  });
});

export const getInfoDetails = asyncError(async (req, res, next) => {
  const myInfo = await Info.findById(req.params.id).populate("user", "name");

  if (!myInfo) return next(new ErrorHandler("Sorry !!! Please Try Again", 404));

  res.status(200).json({
    success: true,
    myInfo,
  });
});

//update Project Name

export const updateProjectName = asyncError(async (req, res, next) => {
  const newProjectName = {
    projectName: req.body.projectName,
    pinfo:req.body.pinfo,
    accessinglink:req.body.accessinglink,
  };

  await Info.findByIdAndUpdate(req.params.id, newProjectName, {
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

  await Info.findByIdAndUpdate(req.params.id, newAccessingLink, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newAccessingLink,
  });
});

//delete
export const deleteInfo = asyncError(async (req, res, next) => {
  const inforomation = await Info.findById(req.params.id);

  if (!inforomation) {
    return next(new ErrorHandler("Error", 404));
  }

  await inforomation.remove();

  res.status(200).json({
    success: true,
  });
});

import fs from "fs";
import { asyncError } from "../middlewares/errorMiddleware.js";
import { TextFile } from "../models/TextFile.js";
import ErrorHandler from "../utils/ErrorHandler.js";

export const createTextFile = asyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const textfile = await TextFile.create(req.body);

  res.status(201).json({
    success: true,
    message: "Completed ",
    textfile,
  });
});

export const getTextFile = asyncError(async (req, res, next) => {
  const mytextfile = await TextFile.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    mytextfile,
  });
});

export const getTextFileDetail = asyncError(async (req, res, next) => {
  const mytextfile = await TextFile.findById(req.params.id).populate(
    "user",
    "name"
  );

  if (!mytextfile)
    return next(new ErrorHandler("Sorry !!! Please Try Again", 404));

  res.status(200).json({
    success: true,
    mytextfile,
  });
});

// update
export const updateTextFile = asyncError(async (req, res, next) => {
  const newData = {
    content: req.body.content,
  };

  await TextFile.findByIdAndUpdate(req.params.id, newData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    newData,
  });
});

//delete
export const deleteTextFile = asyncError(async (req, res, next) => {
  const textfile = await TextFile.findById(req.params.id);

  if (!textfile) {
    return next(new ErrorHandler("Error", 404));
  }

  await textfile.remove();

  res.status(200).json({
    success: true,
  });
});
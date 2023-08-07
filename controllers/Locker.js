import { asyncError } from "../middlewares/errorMiddleware.js";
import { PrivateDoc } from "../models/PrivateDoc.js";
import { PublicDoc } from "../models/PublicDoc.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import cloudinary from "cloudinary";

//add public docs

export const addPublicDocs = asyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Document",
      resource_type: "image",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id;

  const publicDoc = await PublicDoc.create(req.body);

  res.status(201).json({
    success: true,
    message: "Docs added Successfully ",
    publicDoc,
  });
});

//get my docs
export const getMyDocs = asyncError(async (req, res, next) => {
  const myPublicDocs = await PublicDoc.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    myPublicDocs,
  });
});

// Docs detail

export const getDocDetails = asyncError(async (req, res, next) => {
  const publicDoc = await PublicDoc.findById(req.params.id).populate(
    "user",
    "name"
  );

  if (!publicDoc) return next(new ErrorHandler("No Doc Found", 404));

  res.status(200).json({
    success: true,
    publicDoc,
  });
});

//get all docs ---- for admin
export const getAdminDocs = asyncError(async (req, res, next) => {
  const myPublicDocs = await PublicDoc.find({}).populate("user", "name");

  res.status(200).json({
    success: true,
    myPublicDocs,
  });
});

//delete docs
export const deleteDoc = asyncError(async (req, res, next) => {
  const publicDoc = await PublicDoc.findById(req.params.id);

  if (!publicDoc) {
    return next(new ErrorHandler("Doc not found", 404));
  }

  await publicDoc.remove();

  res.status(200).json({
    success: true,
  });
});

////Private docs/////

//add prirvate docs

export const addPrivateDocs = asyncError(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Private Document",
      resource_type: "auto",
      chunk_size: 6000000,
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user._id; ///adddded after hosting

  const privateDoc = await PrivateDoc.create(req.body);

  res.status(201).json({
    success: true,
    message: "Docs added Successfully ",
    privateDoc,
  });
});

//get my Privte docs

export const getMyPrivateDocs = asyncError(async (req, res, next) => {
  const myPrivateDocs = await PrivateDoc.find({
    user: req.user._id,
  }).populate("user", "name");

  res.status(200).json({
    success: true,
    myPrivateDocs,
  });
});

// Docs detail

export const getPrivateDocDetails = asyncError(async (req, res, next) => {
  const myPrivateDoc = await PrivateDoc.findById(req.params.id).populate(
    "user",
    "name"
  );

  if (!myPrivateDoc) return next(new ErrorHandler("No Doc Found", 404));

  res.status(200).json({
    success: true,
    myPrivateDoc,
  });
});

//delete docs

export const deletePrivateDoc = asyncError(async (req, res, next) => {
  const privateDoc = await PublicDoc.findById(req.params.id);

  if (!privateDoc) {
    return next(new ErrorHandler("Doc not found", 404));
  }

  await privateDoc.remove();

  res.status(200).json({
    success: true,
  });
});

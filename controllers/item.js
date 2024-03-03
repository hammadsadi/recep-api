import expressAsyncHandler from "express-async-handler";
import Item from "../models/Item.js";
import {
  deleteFileToCloudinary,
  uploadFileToCloudinary,
} from "../utility/cloudinary.js";
import { findPublicId } from "../helper/helper.js";
/**
 * @Desc Get All Item
 * @Method Get
 * @Access Private
 */
export const getAllItems = expressAsyncHandler(async (req, res) => {
  const items = await Item.find();
  // Data Check
  if (items.length > 0) {
    return res.status(200).json({ items: items, message: "Data Get Success" });
  }
  res.status(404).json({ items: items, message: "Data Not Found" });
});

/**
 * @Desc Create Item
 * @Method POST
 * @Access Private
 */
export const createItems = expressAsyncHandler(async (req, res) => {
  // Get Data
  const { name, category, price } = req.body;

  // Item Validation
  if (!name || !category || !price) {
    return res.status(400).json({ message: "All Fileds Are Required" });
  }
  const items = await Item.findOne({ name: name });
  // Data Check
  if (items) {
    return res.status(400).json({ message: "Item Already Exist" });
  }

  // Upload Image To Cloudinary
  let itemImage = await uploadFileToCloudinary(req.file.path);

  // Send Data to DB
  const itemCreate = await Item.create({
    name,
    category,
    price,
    photo: itemImage.secure_url,
  });

  res
    .status(200)
    .json({ item: itemCreate, message: "Item Created Successful" });
});

/**
 * @Desc Update Item
 * @Method PUT / PATCH
 * @Access Private
 */
export const update_Item = expressAsyncHandler(async (req, res) => {
  // Get ID
  const { id } = req.params;

  // Get Data
  const { name, category, price } = req.body;

  // Get Data From server
  let updateItem = await Item.findById(id);

  // Set Name Data
  let updateName = updateItem.name;
  if (name) {
    updateName = name;
  }

  // Set Category Data
  let updateCat = updateItem.category;
  if (category) {
    updateCat = category;
  }

  // Set Price Data
  let updatePrice = updateItem.price;
  if (price) {
    updatePrice = price;
  }

  // Set Photo Data
  let updatePhoto = updateItem.photo;
  if (req.file) {
    let updateImg = await uploadFileToCloudinary(req.file.path);
    updatePhoto = updateImg.secure_url;
    await deleteFileToCloudinary(findPublicId(updateItem.photo));
  }

  updateItem.name = updateName;
  updateItem.price = updatePrice;
  updateItem.category = updateCat;
  updateItem.photo = updatePhoto;
  updateItem.save();
  res.status(200).json({
    item: updateItem,
    message: `${updateItem.name} Updated Successful`,
  });
});

/**
 * @Desc Delete Item
 * @Method Delete
 * @Access Private
 */

export const deleteItem = expressAsyncHandler(async (req, res) => {
  // Get ID
  const { id } = req.params;

  // Delete Item Feom DB
  const itemDelete = await Item.findByIdAndDelete(id);

  // Delete Cloud Photo
  await deleteFileToCloudinary(findPublicId(itemDelete.photo));

  res.status(200).json({
    item: itemDelete,
    message: `${itemDelete.name} Deleted Successful`,
  });
});

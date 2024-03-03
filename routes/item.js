import express from "express";
import {
  createItems,
  deleteItem,
  getAllItems,
  update_Item,
} from "../controllers/item.js";
import { multerMiddlewareForItem } from "../utility/multer.js";

// Init Route
const router = express.Router();

/**
 * @Desc Item Routing
 * @Method All
 * @Access Private
 */
// router.get("/", getAllItems);
router.route("/").get(getAllItems).post(multerMiddlewareForItem, createItems);
router
  .route("/update-item/:id")
  .put(multerMiddlewareForItem, update_Item)
  .patch(multerMiddlewareForItem, update_Item);
router.delete("/delete/:id", deleteItem);

// Export Router
export default router;

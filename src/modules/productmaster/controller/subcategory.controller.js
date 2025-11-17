import { Op } from "sequelize";
import BaseService from "../../../services/service.js";
import Subcategory from "../models/subcategory.model.js";
// import { uploadSingle } from "../../../middleware/upload.js";

const subcategoryService = new BaseService(Subcategory);

// Create Subcategory
// export const createSubcategory = async (req, res) => {
//   try {

//        console.log("REQ.BODY:", req.body);
//     console.log("REQ.FILE:", req.file);

//     const data = req.body;

//     // ✅ Fix: use req.file correctly
//     const image = req.file ? `/uploads/subcategories/${req.file.filename}` : null;

//     // ✅ Include image field before creating the record
//     const newRecord = await subcategoryService.create({
//       ...data,
//       image_url: image, // ensure matches model column name
//     });

//     return res.status(201).json({
//       message: "Subcategory created successfully",
//       data: newRecord,
//     });
//   } catch (error) {
//     console.error("Error creating subcategory:", error);
//     return res.status(500).json({
//       message: "Failed to create subcategory",
//       error: error.message,
//     });
//   }
// };


export const createSubcategory = async (req, res) => {
  try {
    console.log("REQ.BODY:", req.body);
    console.log("REQ.FILE:", req.file);

    const data = { ...req.body };
    if (req.file) data.image = `/uploads/subcategories/${req.file.filename}`;

    // extra safety: validate required fields server-side too
    if (!data.subcategory_name) return res.status(400).json({ message: "subcategory_name is required" });
    if (!data.category_id) return res.status(400).json({ message: "category_id is required" });

    const newRecord = await subcategoryService.create(data);
    return res.status(201).json({ message: "Subcategory created successfully", data: newRecord });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({ message: "Failed to create subcategory", error: error.message });
  }
};


// Get All Subcategories
export const getAllSubcategories = async (req, res) => {
  try {
    const result = await subcategoryService.getAll({
      searchFields: ["subcategory_name", "category_code", "description"],
    });
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch subcategories",
      error: error.message,
    });
  }
};

// Get Subcategory by ID
export const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await subcategoryService.getById(id);
    return res.status(200).json(record);
  } catch (error) {
    return res.status(404).json({ message: "Subcategory not found" });
  }
};

// Update Subcategory
export const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await subcategoryService.update(id, req.body);

    return res.status(200).json({
      message: "Subcategory updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update subcategory",
      error: error.message,
    });
  }
};

// Delete Subcategory
export const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await subcategoryService.delete(id);

    return res.status(200).json({
      message: "Subcategory deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete subcategory",
      error: error.message,
    });
  }
};

export default {
  createSubcategory,
  getAllSubcategories,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};

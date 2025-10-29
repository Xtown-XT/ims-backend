// import { Op } from "sequelize";
// import Category from "../models/categories.js"; // path to your category model
// import BaseService from "../../../services/service.js";

// const categoryService = new BaseService(Category);

// // =======
// // Create Category
// export const createCategory = async (req, res) => {
//   try {
//     const data = req.body;
//     const newCategory = await categoryService.create(data);

//     return res.status(201).json({
//       message: "Category created successfully",
//       data: newCategory,
//     });
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return res.status(500).json({
//       message: "Failed to create category",
//       error: error.message,
//     });
//   }
// };

// // Get All Categories
// export const getAllCategories = async (req, res) => {
//   try {
//     const result = await categoryService.getAll({
//       searchFields: ["name", "description", "status"], // adjust fields according to your model
//     });
//     return res.status(200).json(result);
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to fetch categories",
//       error: error.message,
//     });
//   }
// };

// // Get Category by ID
// export const getCategoryById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const record = await categoryService.getById(id);
//     return res.status(200).json(record);
//   } catch (error) {
//     return res.status(404).json({ message: "Category not found" });
//   }
// };

// // Update Category
// export const updateCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updated = await categoryService.update(id, req.body);

//     return res.status(200).json({
//       message: "Category updated successfully",
//       data: updated,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to update category",
//       error: error.message,
//     });
//   }
// };

// // Delete Category
// export const deleteCategory = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const result = await categoryService.delete(id);

//     return res.status(200).json({
//       message: "Category deleted successfully",
//       data: result,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "Failed to delete category",
//       error: error.message,
//     });
//   }
// };

// export default {
//   createCategory,
//   getAllCategories,
//   getCategoryById,
//   updateCategory,
//   deleteCategory,
// };
import BaseService   from "../../../services/service.js";
import categories from "../models/categories.js"

const categoryService = new BaseService(categories);
// Create Category
export const createCategory = async (req, res) => {
  console.log("REQ.BODY:", req.body); // debug input
  if (!req.body.category_name) {
    return res.status(400).json({ message: "category_name is required" });
  }

  try {
    const newCategory = await categoryService.create(req.body);
    return res.status(201).json({
      message: "Category created successfully",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return res.status(500).json({
      message: "Failed to create category",
      error: error.message,
    });
  }
};

// Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const {
      q: search = "",
      page = 1,
      limit = 10,
      sortField = "created_on",
      sortOrder = "DESC",
    } = req.query ?? {};

    // whitelist allowed sort fields
    const allowedSortFields = [
      "id",
      "category_name",
      "category_slug",
      "created_by",
      "created_on",
    ];

    const safeSortField = allowedSortFields.includes(sortField) ? sortField : "created_on";
    const safeSortOrder = String(sortOrder).toUpperCase() === "ASC" ? "ASC" : "DESC";

    // IMPORTANT: don't pass an attributes array that omits created_on.
    // Either omit attributes so Sequelize returns all model fields (including created_on),
    // or explicitly include created_on.
    // I'm omitting attributes here so created_on will be present if the model defines it.
    const result = await categoryService.getAll({
      searchFields: ["category_name", "description"],
      search: search || undefined,
      page: Number(page) || 1,
      limit: Number(limit) || 10,
      orderBy: safeSortField, // service expects column name string
      order: safeSortOrder,   // service expects "ASC" or "DESC"
      // Do NOT pass attributes that would exclude created_on
    });

    return res.status(200).json({
      message: "Categories fetched successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};






// Get Category by ID
export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await categoryService.getById(id);
    return res.status(200).json(record);
  } catch (error) {
    return res.status(404).json({ message: "Category not found" });
  }
};

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await categoryService.update(id, req.body);
    return res.status(200).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update category",
      error: error.message,
    });
  }
};

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await categoryService.delete(id);
    return res.status(200).json({
      message: "Category deleted successfully",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete category",
      error: error.message,
    });
  }
};

export default {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};


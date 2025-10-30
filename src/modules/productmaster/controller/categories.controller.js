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
import { formatDates } from "../../../utils/dataFormatter.js";

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
    // read optional query params (fall back to defaults)
    const {
      page = 1,
      limit = 10,
      search = "",
      orderBy = "category_name", // SAFE default column (string)
      order = "ASC",             // ASC or DESC (string)
      includeInactive = "false", // query params are strings
    } = req.query;

    // Convert includeInactive to boolean
    const includeInactiveBool = includeInactive === "true";

    // Call BaseService with proper typed params (strings for orderBy/order)
    const result = await categoryService.getAll({
      includeInactive: includeInactiveBool,
      search,
      page: Number(page),
      limit: Number(limit),
      orderBy: String(orderBy),
      order: String(order),
      searchFields: ["category_name", "category_slug"],
    });

    // BaseService returns { rows, count, page, limit, totalPages }
    const { rows = [], count = 0, totalPages = 0 } = result;

    // Convert Sequelize instances to plain objects safely
    const toPlain = (item) => {
      if (!item) return item;
      if (typeof item.toJSON === "function") return item.toJSON();
      return item;
    };

    const formattedRows = rows.map((r) => formatDates(toPlain(r)));

    return res.status(200).json({
      rows: formattedRows,
      count,
      page: Number(page),
      limit: Number(limit),
      totalPages,
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


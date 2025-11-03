import path from "path";
import { sequelize } from "../../../db/index.js";
import Employee from "../models/employee.model.js";
import Role from "../models/role.model.js";
import BaseService from "../../../services/service.js";

const employeeService = new BaseService(Employee);

// ============================================================
// 🔹 Create Employee
// ============================================================
export const createEmployee = async (req, res) => {
  try {
    const { username, email, phone, password, role_id } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({
        message: "Username, email, phone, and password are required.",
      });
    }

    // Check duplicate email
    const existing = await Employee.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const payload = {
      username,
      email,
      phone,
      password, // hash in middleware ideally
      role_id: role_id || null,
      profile_picture: req.file
        ? `/uploads/employees/${req.file.filename}`
        : null,
      created_by: req.user?.id || "system",
    };

    const newEmployee = await employeeService.create(payload);

    return res.status(201).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("❌ Error creating employee:", error);
    return res.status(500).json({
      message: "Failed to create employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Update Employee
// ============================================================
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const payload = {
      ...req.body,
      updated_by: req.user?.id || "system",
    };

    if (req.file) {
      payload.profile_picture = `/uploads/employees/${req.file.filename}`;
    }

    const updatedEmployee = await employeeService.update(id, payload);

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    return res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Get All Employees
// ============================================================
export const getAllEmployees = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 10, orderBy = "createdAt", order = "ASC" } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = search
      ? {
          [sequelize.Op.or]: [
            { username: { [sequelize.Op.like]: `%${search}%` } },
            { email: { [sequelize.Op.like]: `%${search}%` } },
            { phone: { [sequelize.Op.like]: `%${search}%` } },
          ],
        }
      : {};

    const { rows, count } = await Employee.findAndCountAll({
      where: whereClause,
      include: [{ model: Role, attributes: ["id", "role_name"] }],
      order: [[orderBy, order]],
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    return res.status(200).json({
      message: "Employees fetched successfully",
      data: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    return res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Get Employee By ID
// ============================================================
export const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findOne({
      where: { id },
      include: [{ model: Role, attributes: ["id", "role_name"] }],
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee fetched successfully",
      data: employee,
    });
  } catch (error) {
    console.error("❌ Error fetching employee:", error);
    return res.status(500).json({
      message: "Failed to fetch employee",
      error: error.message,
    });
  }
};

// ============================================================
// 🔹 Delete Employee
// ============================================================
export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await employeeService.delete(id);

    if (!result) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    return res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
};

export default {
  createEmployee,
  updateEmployee,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
};

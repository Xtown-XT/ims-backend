// src/modules/associations/index.js
import Employee from "../modules/employee/models/employee.model.js";
import Role from "../modules/employee/models/role.model.js"; 

// 1️⃣ One Role can have many Employees
Role.hasMany(Employee, {
  foreignKey: "role_id",
  as: "employees",
});

// 2️⃣ Each Employee belongs to one Role
Employee.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

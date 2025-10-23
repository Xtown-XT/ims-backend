import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import { is } from "zod/v4/locales";

const Categories = sequelize.define(
  "Categories",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,  // ✅ Must NOT be null
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull:true,
    },
  },
  {
    tableName: "categories",
    timestamps: false, 
    paranoid :true
  }
);

export default Categories;

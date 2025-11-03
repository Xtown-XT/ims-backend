import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Categories from "../models/categories.js";

const Subcategory = sequelize.define(
  "Subcategory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "categories",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    category_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "subcategories",
    timestamps: true,
    paranoid: true,
  }
);

Categories.hasMany(Subcategory, { foreignKey: "category_id" });
Subcategory.belongsTo(Categories, { foreignKey: "category_id" });

export default Subcategory;

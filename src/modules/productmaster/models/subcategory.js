import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import Categories from "./categories.js";

const Subcategory = sequelize.define("Subcategory", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  },
});

Categories.hasMany(Subcategory, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

Subcategory.belongsTo(Categories, {
  foreignKey: "category_id",
});

export default Subcategory;

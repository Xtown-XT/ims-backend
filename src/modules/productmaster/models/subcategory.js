import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";
import { ca } from "zod/v4/locales";
const Subcategory = sequelize.define(
  "Subcategory",
  {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        },
    subcategory_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Categories", // name of Target model
        key: "id", // key in Target model that we're referencing
      },    
    },
    category_code: {
      type: DataTypes.STRING,
      allowNull: true,  
    },
    Description:{
        type: DataTypes.TEXT,
        allowNull: true,
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
        allowNull: true,
    },
},
  {
    tableName: "subcategories",
    timestamps: false,
    paraniod: true,
    }
);
export default Subcategory;


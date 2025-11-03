import { DataTypes, Op } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Employee = sequelize.define(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9+\-() ]+$/i, // phone number pattern
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // 🔐 Role mapping (optional foreign key)
    role_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "roles", // table name for roles
        key: "id",
      },
    },

    // 🖼️ Profile picture
    profile_picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // ⚙️ Account status
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    // 🧾 Audit fields
    created_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "endusers",
        key: "id",
      },
    },

    updated_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "endusers",
        key: "id",
      },
    },
  },
  {
    tableName: "employees",
    timestamps: true,
    paranoid: true, // soft delete
    deletedAt: "deleted_at",

    }
);

export default Employee;

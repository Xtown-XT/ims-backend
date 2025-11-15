import { DataTypes } from "sequelize";
import { sequelize } from "../../../db/index.js";

const Finance = sequelize.define("Finance",{

    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
})
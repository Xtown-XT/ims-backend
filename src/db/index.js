import SequelizePkg from "sequelize";

// Access the Sequelize constructor, DataTypes, and Op
const Sequelize = SequelizePkg; // <-- fix here
const { DataTypes, Op } = SequelizePkg;

// Create Sequelize instance
const sequelize = new Sequelize("ims", "ramya", "ramya", {
  host: "192.168.1.150",
  port: 3306,
  dialect: "mysql",
});

// Authenticate database connection inside async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully");
  } catch (err) {
    console.error("❌ Database connection error:", err);
  }
})();

// Export for models/services
export { sequelize, DataTypes, Op };
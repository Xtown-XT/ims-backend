import SequelizePkg from "sequelize";

// Access the Sequelize constructor, DataTypes, and Op
const Sequelize = SequelizePkg; // <-- fix here
const { DataTypes, Op } = SequelizePkg;

// Create Sequelize instance
const sequelize = new Sequelize("ims_demo", "root", "Sanjay@1218", {
  host: "127.0.0.1",
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
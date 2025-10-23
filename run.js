// index.js

import app from './src/index.js';
import dotenv from 'dotenv';
import os from 'os';


// Import two separate Sequelize instances with different names
import { sequelize as imsSequelize } from './src/db/index.js';

// ← Add this import:
// import { sequelize } from './src/db/index.js';


dotenv.config();

const port = process.env.PORT || 5000;
const host = process.env.HOST || getLocalIP();

// Function to get the local IP address
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '0.0.0.0';
}


// Start server and sync both databases
app.listen(port, host, async () => {
  try {
    // Sync tables for both databases
    await imsSequelize.sync();      // Sync hrms_demo
   

    console.log(`Server is running on http://${host}:${port}`);
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
});

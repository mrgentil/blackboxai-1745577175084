const mysql = require('mysql2/promise');
require('dotenv').config();

let pool;

const initializePool = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'influencer_platform',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    // Test connection
    const connection = await pool.getConnection();
    console.log('Connected to MySQL database');
    connection.release();
    
    return pool;
  } catch (err) {
    console.warn('Warning: MySQL connection failed:', err.message);
    console.log('Application will continue without database functionality');
    
    // Create a mock pool for development
    return {
      execute: () => Promise.reject(new Error('Database not connected')),
      query: () => Promise.reject(new Error('Database not connected')),
    };
  }
};

// Initialize the pool
const poolPromise = initializePool();

module.exports = {
  query: async (sql, params) => {
    try {
      const connection = await poolPromise;
      const [results] = await connection.execute(sql, params);
      return results;
    } catch (err) {
      console.error('Database query error:', err.message);
      throw err;
    }
  }
};

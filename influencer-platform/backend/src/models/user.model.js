const db = require('../config/db');
const bcrypt = require('bcrypt');

class UserModel {
  static async createUser({ email, password, firstName, lastName, role }) {
    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const result = await db.query(
        `INSERT INTO users (email, password_hash, first_name, last_name, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, email, first_name, last_name, role, created_at`,
        [email, passwordHash, firstName, lastName, role]
      );

      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique violation error code
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  }

  static async findById(id) {
    const result = await db.query(
      'SELECT id, email, first_name, last_name, role, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }

  static async updateUser(id, updates) {
    const allowedUpdates = ['first_name', 'last_name', 'email'];
    const updateFields = Object.keys(updates)
      .filter(key => allowedUpdates.includes(key) && updates[key] !== undefined);
    
    if (updateFields.length === 0) return null;

    const setClause = updateFields
      .map((field, index) => `${field} = $${index + 2}`)
      .join(', ');
    const values = updateFields.map(field => updates[field]);

    const query = `
      UPDATE users
      SET ${setClause}
      WHERE id = $1
      RETURNING id, email, first_name, last_name, role, created_at
    `;

    const result = await db.query(query, [id, ...values]);
    return result.rows[0];
  }

  static async changePassword(id, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await db.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [passwordHash, id]
    );
  }

  static async verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }

  static async deleteUser(id) {
    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [id]
    );
    return result.rows[0];
  }
}

module.exports = UserModel;

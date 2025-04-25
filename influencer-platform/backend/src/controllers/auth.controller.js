const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/user.model');

class AuthController {
  static async register(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, firstName, lastName, role } = req.body;

      // Create user
      const user = await UserModel.createUser({
        email,
        password,
        firstName,
        lastName,
        role
      });

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        },
        token
      });
    } catch (error) {
      if (error.message === 'Email already exists') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  static async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Find user by email
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await UserModel.verifyPassword(password, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user.id,
          role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.json({
        message: 'Login successful',
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        },
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  static async getProfile(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Error fetching user profile' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updates = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      };

      const updatedUser = await UserModel.updateUser(req.user.id, updates);
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          firstName: updatedUser.first_name,
          lastName: updatedUser.last_name,
          role: updatedUser.role
        }
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ message: 'Error updating profile' });
    }
  }

  static async changePassword(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { currentPassword, newPassword } = req.body;

      // Get user with password hash
      const user = await UserModel.findByEmail(req.user.email);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verify current password
      const isValidPassword = await UserModel.verifyPassword(currentPassword, user.password_hash);
      if (!isValidPassword) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // Update password
      await UserModel.changePassword(req.user.id, newPassword);

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change password error:', error);
      res.status(500).json({ message: 'Error changing password' });
    }
  }
}

module.exports = AuthController;

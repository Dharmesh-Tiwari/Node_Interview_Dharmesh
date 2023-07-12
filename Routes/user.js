const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const UserSession = require('../models/UserSession'); 

// POST /user/createWithArray
router.post('/createWithArray', async (req, res) => {
  try {
    const users = req.body; // Array of user objects in the request body
    const createdUsers = await User.create(users);
    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});


// POST /user/createWithList
router.post('/createWithList', async (req, res) => {
    try {
      const userList = req.body; 
      const createdUsers = await User.insertMany(userList);
      res.status(201).json(createdUsers);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// GET /user/{username}
router.get('/:username', async (req, res) => {
    try {
      const { username } = req.params;
      // Find the user by the username
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  // POST /user/login
router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.query;
  
      // Find the user by the username and password
      const user = await User.findOne({ username, password });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid username/password supplied' });
      }
  
      const token = generateToken();
      const expirationTime = new Date(Date.now() + 3600000); // Token expires in 1 hour
  
      // Set the headers for the token and expiration time
      res.setHeader('X-Expires-After', expirationTime.toUTCString());
      res.setHeader('X-Rate-Limit', 100); 
  
      res.status(200).json(token);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Function to generate a random token
  function generateToken() {
    return uuidv4();
  }

// Assuming a UserSession model for tracking user sessions

  // POST /user/logout
  router.post('/logout', async (req, res) => {
    try {
      const { token } = req.headers; // Assuming the token is sent in the headers
  
      // Find and delete the user session associated with the token
      await UserSession.findOneAndDelete({ token });
  
      res.status(200).json({
        code: 200,
        type: 'unknown',
        message: 'ok'
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });


  // POST /user
router.post('/', async (req, res) => {
    try {
      const userData = req.body; // User data sent in the request body
  
      // Create a new user using the User model
      const createdUser = await User.create(userData);
  
      res.status(201).json(createdUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PUT /user/{username}
router.put('/:username', async (req, res) => {
    try {
      const { username } = req.params;
      const userData = req.body; // Updated user data sent in the request body
  
      // Find and update the user by the username
      const updatedUser = await User.findOneAndUpdate({ username }, userData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  router.delete('/:username', async (req, res) => {
    try {
      const { username } = req.params;
  
      // Find and delete the user by the username
      const deletedUser = await User.findOneAndDelete({ username });
  
      if (!deletedUser) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router;
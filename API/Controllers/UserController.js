// userController.js
const { usersCollection } = require('../firebase.js')

// Get User

async function getUser(req, res) {
  try {
    const { userId } = req.params;

    // Check if the user exists in Firestore using userId as id, username, or tag
    const userQuery = await usersCollection.where('id', '==', userId)
      .orWhere('username', '==', userId)
      .orWhere('tag', '==', userId)
      .get();

    if (!userQuery.empty) {
      // If user is found, return user data
      const userData = userQuery.docs[0].data();
      res.json({ message: 'User found', user: userData });
    } else {
      // If user is not found, return 404 status
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Error getting user', details: err.message });
  }
}

module.exports = { 
  getUser,
};

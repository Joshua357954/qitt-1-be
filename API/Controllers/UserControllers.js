const axios = require('axios');
const { firestore } = require('../firebase');
const { collection, doc, update, get, getDoc } = require('firebase/firestore')

// Verify User
async function verifyUser(req, res) {
    try {
        const { regNumber, verificationType } = req.body;
        const uid = req.user.uid; // Assuming you have middleware to validate user authentication

        const apiUrl = `${userDataApi}/api/user/${regNumber}`;
        const response = await axios.get(apiUrl);
        const userDataFromRegNumberApi = response.data;

        if (!userDataFromRegNumberApi) {
            return res.status(404).json({ error: 'User not found with the provided registration number' });
        }

        let isVerificationSuccessful = false;

        // Check verification type
        if (verificationType === 'document' && userDataFromRegNumberApi.hasDocument) {
            isVerificationSuccessful = true;
        } else if (verificationType === 'regNumber' && userDataFromRegNumberApi.verificationType === 'regNumber') {
            isVerificationSuccessful = true;
        }

        if (isVerificationSuccessful) {
            // Update user's verified status in Firestore
            await update(doc(collection('users'), uid), { verified: true });

            res.status(200).json({ message: 'User verified successfully' });
        } else {
            res.status(403).json({ error: 'Verification failed. Invalid verification type or document not provided.' });
        }
    } catch (error) {
        console.error('Error verifying user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get User
async function getUser(req, res) {
    try {
      const uid = req.params.uid;
      console.log('User ID:', uid);
      
      // Construct the collection path and get user data from Firestore
      const userDoc = await getDoc(doc(collection(firestore, 'usersV1'), uid));
  
      if (!userDoc.exists()) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const userData = userDoc.data();
  
      res.status(200).json({ ...userData });
    } catch (error) {
      console.error('Error getting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    verifyUser,
    getUser
};

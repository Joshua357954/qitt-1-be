const { firestore } = require('../firebase.js');
const { collection, query, where,or, getDocs, getDoc, addDoc, doc, updateDoc , orderBy, startAt, endAt } = require('firebase/firestore');

const usersCollection = collection(firestore, 'users');

async function getUsers(req, res) {
  try {
    const { department } = req.params;
    console.log(department, ' loading ...')
    
    // Create a query to get all documents from the users collection
    const querySnapshot = await getDocs(usersCollection);
    // console.log(querySnapshot)
    
    // Extract and filter data from the snapshot based on the search condition
    const users = querySnapshot.docs
      .filter((doc) => doc.data().department == department)
      .map((doc) => ({ id: doc.id, name:doc.data().otherNames, imgUrl:doc.data().picture }));
    console.log("Users:", users)
    // Send the matching users as a response
    res.json([...users]);
  } catch (err) {
    // Handle errors
    console.error(err);
    res.status(500).json({ error: 'Error searching for users', details: err.message });
  }
}

module.exports = { 
  getUsers,
};

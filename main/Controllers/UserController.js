const { firestore } = require('../firebase.js');
const { collection, query, where,or, getDocs, getDoc, addDoc, doc, updateDoc , orderBy, startAt, endAt } = require('firebase/firestore');

const usersCollection = collection(firestore, 'usersV1');

async function getUsers(req, res) {
  try {
    const { department } = req.params;
    console.log(department, ' loading ...')
    
    // Create a query to get all documents from the users collection
    const querySnapshot = await getDocs(usersCollection);
    // console.log(querySnapshot)
    
    // Extract and filter data from the snapshot based on the search condition
    const users = querySnapshot.docs
      .filter((doc) => doc.data().department.value == department)
      .map((doc) => ({ id: doc.id, name:doc.data().name}));
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



// Assuming you have access to the Firestore collection
// const { firestore } = require('../firebase.js');
// const { collection, getDocs, where } = require('firebase/firestore');

// const usersCollection = collection(firestore, 'users');


// function formatUserData(studentData) {
//   return {
//     name: studentData.otherNames,
//     email: studentData.email,
//     joined: studentData.createdAt,
//     gender: studentData.sex,
//     dateOfBirth: studentData.dateOfBirth,
//     faculty: studentData.faculty,
//     department: studentData.department,
//     session: studentData.admissionSession,
//     imageUrl:studentData.picture,
//     regNumber:studentData.registrationNo,
//     courseName: courseShortForms[studentData.department.toLowerCase()]
//   };
// }



// async function getUsers(req, res) {
//   try {
//     const { email, registrationNo } = req.params;

//     if (email || registrationNo) {
//       // If email or registrationNo is provided, get a single user
//       const user = await getUser(email, registrationNo);
//       res.json(user);
//     } else {
//       // If neither email nor registrationNo is provided, get all users in the specified department
//       const querySnapshot = await getDocs(usersCollection);
//       const users = querySnapshot.docs
//         .map((doc) => ({ id: doc.id, name: doc.data().otherNames, imgUrl: doc.data().picture }));

//       res.json(users);
//     }
//   } catch (err) {
//     // Handle errors
//     console.error(err);
//     res.status(500).json({ error: 'Error getting users', details: err.message });
//   }
// }

// async function getUser(email, registrationNo) {
//   console.log(`Loading user with email: ${email} or registrationNo: ${registrationNo} ...`);

//   const querySnapshot = await getDocs(usersCollection);

//   const users = querySnapshot.docs
//     .filter((doc) => (doc.data().email == email || doc.data().registrationNo == registrationNo))
//     .map((doc) => ({ id: doc.id, name: doc.data().otherNames, imgUrl: doc.data().picture }));

//   if (users.length > 0) {
//     return users[0];  
//   } else {
//     return null;
//   }
// }

// module.exports = {
//   getUsers,
//   getUser,
// };

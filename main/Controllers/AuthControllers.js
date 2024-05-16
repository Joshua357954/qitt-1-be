// Firestore
const { collection, doc, update, setDoc, add, query, where, getDocs, updateDoc, getDoc } = require('firebase/firestore');  // Replace with your Firestore module
const { firestore } = require('../firebase');

// Register User
async function registerUser(req, res) {
    try {
        const { email, displayName, imgURL, uid } = req.body;

        // Check if the user with the given email already exists
        const userQuery = query(collection(firestore, 'usersV1'), where('email', '==', email));
        const userSnapshot = await getDocs(userQuery);
        
        if (!userSnapshot.empty) {
          const existingUser = userSnapshot.docs[0].data();
          console.log('User with this email already exists:', existingUser.email);

          return res.json({login:true, message: `Welcome back ${existingUser.name} 😊`, ...existingUser });
        } 


        // User does not exist, proceed to registration
        const user_data = {
            id: uid,
            email: email,
            imgURL,
            name: displayName,
            verified: false,
            enrolled: false
        };

        // Use customUserId as the document ID
        const userDocRef = doc(collection(firestore, 'usersV1'), uid);

        // Create user in Firestore (or update an existing one)
        await setDoc(userDocRef, user_data, { merge: true });

        // Log the response before sending it
        console.log('Response:', {
            message: '✅ User registered successfully ✅',
            uid: userDocRef.id,
            name: displayName
        });

        return res.status(201).json({login:false, message: '✅ User registered successfully', uid: userDocRef.id, name: displayName });
    } catch (error) {
        console.error('Error registering user:', error);

        // Log the error response before sending it
        console.log('Error Response:', { error: '❌ Internal server error ❌' });

        res.status(500).json({ error: '❌ Internal server error ❌' });
    }
}



// Enroll User (User MetaData)
async function enrollUser(req, res) {
    try {
        const { regNumber, faculty, department, year, birthday } = req.body;
        const uid = req.params.uid;
        console.log(uid)

        // Create a reference to the user document in Firestore
        const userRef = doc(collection(firestore, 'usersV1'), uid);

        // Fetch user data
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if user is already enrolled
        const isEnrolled = userDoc.data().enrolled;

        if (isEnrolled) {
            console.log('Already Enrolled')
            return res.json({ error: '🚫 User is already enrolled , Login' });
        }

        // Update user data using updateDoc
        await updateDoc(userRef, {
            enrolled: true,
            regNumber: regNumber,
            faculty: faculty,
            department: department,
            year: year,
            birthday: birthday
        });

        // Fetch the updated user data
        const updatedUserDoc = await getDoc(userRef);

        // Send back the updated user data in the response
        res.status(200).json({ message: '✅ User enrolled successfully', user: updatedUserDoc.data() });
    } catch (error) {
        console.error('Error enrolling user:', error);
        res.status(500).json({ error: '❌ Internal server error' });
    }
}

module.exports = {
    registerUser,
    enrollUser
};

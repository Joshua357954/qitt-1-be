const { initializeApp } = require('firebase/app');

const { getFirestore  } = require('firebase/firestore');
 


const firebaseConfig = {
  apiKey: "AIzaSyCNSMiuUBfODsX0iP4lcIzjPQmUo3PjXDE",
  authDomain: "qitt-student.firebaseapp.com",
  projectId: "qitt-student",
  storageBucket: "qitt-student.appspot.com",
  messagingSenderId: "942426242318",
  appId: "1:942426242318:web:5f4010933ab374317eeb5f",
  measurementId: "G-P3QLEPFYZQ"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

module.exports = { firestore };
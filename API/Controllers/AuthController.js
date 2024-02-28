const axios = require('axios');
const bcrypt = require('bcrypt');
const { firestore } = require('../firebase.js');
const { collection, query, where,or, getDocs, getDoc, addDoc, doc, updateDoc , orderBy, startAt, endAt } = require('firebase/firestore');

const usersCollection = collection(firestore, 'users');
const userDataApi = process.env.NODE_ENV === 'production' ? 'https://csc-rttj.onrender.com/' : 'http://localhost:3000';



const courseShortForms = {
  "accounting": "Accounting",
  "adult and non-formal education": "ANFE",
  "adult education": "AE",
  "agriculture economics and extension": "AEE",
  "agriculture": "Agric",
  "anatomy": "Anatomy",
  "animal and environmental biology": "AEB",
  "animal science": "AS",
  "banking and finance": "B & F",
  "biochemistry": "Biochem",
  "botany": "Bot",
  "business education": "Bus Ed",
  "business management": "BM",
  "chemical engineering": "Chem Eng",
  "chemistry": "Chem",
  "civil engineering": "CE",
  "computer science": "CSC",
  "computer science and mathematics": "CSM",
  "computer with statistics": "CwS",
  "creative arts": "CA",
  "dentistry and dental surgery": "DDS",
  "drama / dramatic / performing arts": "Drama / PA",
  "early childhood education": "ECE",
  "economics": "Econ",
  "education and fine art": "Edu / FA",
  "education accounting": "Edu Acc",
  "education and biology": "Edu / Bio",
  "education and chemistry": "Edu / Chem",
  "education and computer science": "Edu / CS",
  "education and economics": "Edu / Econ",
  "education and english language": "Edu / Eng",
  "education and french": "Edu / Fr",
  "education and geography": "Edu / Geo",
  "education and history": "Edu / His",
  "education and mathematics": "Edu / Math",
  "education and physics": "Edu / Phys",
  "education and political science": "Edu / Pol Sci",
  "education and religious studies": "Edu / Rel Stud",
  "education and social science": "Edu / Soc Sci",
  "education and social studies": "Edu / Soc St",
  "education arts": "Edu Arts",
  "education foundation and management": "Edu F & M",
  "educational / psychology, guidance and counseling": "Edu Psy",
  "electrical and electronics engineering": "EE Eng",
  "electrical engineering": "EE",
  "electronics engineering": "E Eng",
  "english language": "Eng Lang",
  "environmental education": "Env Edu",
  "environmental engineering": "Env Eng",
  "environmental technology": "Env Tech",
  "fine arts and design": "FAD",
  "fisheries": "Fish",
  "food science and technology": "Food Sci & Tech",
  "forestry and wildlife": "FWL",
  "french": "Fr",
  "geography and environmental management": "Geo & Env Mgmt",
  "geology": "Geo",
  "history": "Hist",
  "home science": "HS",
  "hospitality and tourism management": "HTM",
  "human kinetics and health education": "HKHE",
  "industrial chemistry": "Ind Chem",
  "law": "Law",
  "library and information science": "LIS",
  "marketing": "Mkt",
  "mathematics": "Math",
  "mathematics and statistics": "Math & Stats",
  "mathematics with computer science": "Math & CS",
  "mechanical engineering": "MECH ENG",
  "mechatronics engineering": "Mec Eng",
  "medicine and surgery": "Med & Surg",
  "microbiology": "Microbio",
  "music": "Music",
  "nursing": "Nursing",
  "petroleum and gas engineering": "P & GE",
  "pharmacy": "Pharm",
  "philosophy": "Phil",
  "physical education": "PE",
  "physics": "Phys",
  "physics with electronics": "Phys w/ E",
  "physiology": "Physio",
  "plant science and biotechnology": "Plant Sci & Biotech",
  "political and administrative studies": "Pol & Adm Stud",
  "primary education studies": "PES",
  "public administration": "Pub Admin",
  "pure and applied mathematics": "Pure / Appl Math",
  "pure and industrial chemistry": "Pure & Ind Chem",
  "religious and cultural studies": "Rel & Culture Stud",
  "science education": "Sci Edu",
  "science laboratory technology": "SLT",
  "social works": "SW",
  "sociology": "Soc",
  "teacher education science": "TEd Sci",
  "theatre and film studies": "Theatre / Film",
  "zoology": "Zoo",
  "linguistics and nigerian languages": "Ling & NL",
  "linguistics and communication studies": "Ling & CS",
  "natural gas engineering": "NGE"
};





const createUserInFirestore = async (studentData, values, update = false, Id = 0) => {
  try {
    if (studentData?.email !== values?.email) {
      return { status: false, message: "Invalid email. Please try again. 🙏" };
    }

    const userDataForFrontend = {
      name: studentData.otherNames,
      email: studentData.email,
      joined: studentData.createdAt,
      gender: studentData.sex,
      dateOfBirth: studentData.dateOfBirth,
      faculty: studentData.faculty,
      department: studentData.department,
      session: studentData.admissionSession,
      imageUrl:studentData.picture,
      regNumber:studentData.registrationNo,
      courseName: courseShortForms[studentData.department.toLowerCase()]
    };

    const hashedPassword = await bcrypt.hash(values.password, 10);
    const updatedStudentData = { ...studentData, password: hashedPassword };

    console.log("Trying to create:", updatedStudentData);

    const USER = update
      ? await updateDoc(doc(usersCollection, Id), { password: hashedPassword })
      : await addDoc(usersCollection, updatedStudentData);

    return { status: true, message: '🎉 Registration Successful! ', userId: Id, ...userDataForFrontend };

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

function formatUserData(studentData) {
  return {
    name: studentData.otherNames,
    email: studentData.email,
    joined: studentData.createdAt,
    gender: studentData.sex,
    dateOfBirth: studentData.dateOfBirth,
    faculty: studentData.faculty,
    department: studentData.department,
    session: studentData.admissionSession,
    imageUrl:studentData.picture,
    regNumber:studentData.registrationNo,
    courseName: courseShortForms[studentData.department.toLowerCase()]
  };
}




const register = async (req, res) => {
  try {
    const values = req.body;
    console.log("Values: ", values);
    values.regNumber = values.regNumber.toUpperCase()

    const emailQuery = await getDocs(query(usersCollection, where('email', '==', values.email)));
    const regNumberQuery = await getDocs(query(usersCollection, where('registrationNo', '==', values.regNumber)));

    const existingEmailData = emailQuery.docs[0]?.data();
    const existingRegNumberData = regNumberQuery.docs[0]?.data();

    if (existingRegNumberData?.registrationNo) {
      if (!existingRegNumberData?.password && !regNumberQuery.empty) {
        const createUserResponse = await createUserInFirestore(existingRegNumberData, values);
        return res.json({ ...createUserResponse });
      }

      if (!regNumberQuery.empty) {
        console.log("RegNumber Query Check =====>")
        console.log("01 RegNumber exists. Please log in. 🤔");
        return res.json({ message: "User with this RegNumber exists. Please log in. 🤔" });
      }

      if (!emailQuery.empty) {
        console.log("Email Query Check =====>")
        console.log("Email already in use. Please log in. 📧🔐");
        return res.json({ message: "Email already in use. Please log in. 📧🔐" });
      }
    }

    const regNumber = values.regNumber;
    const apiUrl = `${userDataApi}/api/user/${regNumber}`;
    const response = await axios.get(apiUrl);
    const studentData = JSON.parse(response.data);

    console.log(studentData, 'Type : ', typeof(studentData));

    if (!studentData) {
      const errorMessage = "Invalid RegNumber. 🚫 Please check and try again.";
      console.log(errorMessage);
      return res.json({ message: errorMessage });
    }

    const newUserRef = await addDoc(usersCollection, studentData);
    const createUserResponse = await createUserInFirestore(studentData, values, true, newUserRef.id);

    console.log("Data Slow Route =====>>>>>>");

    return res.json({ ...createUserResponse });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Oops! Something went wrong. Please try again later. 🙁' });
  }
};








const verifyUser = async (req, res) => {
  const { userId } = req.params;
  const qa = req.body;


  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = userDoc.data();

    if (user.verified) {
      return res.json({ message: 'User is already verified', user });
    }

    const question = Object.keys(qa)[0];
    const answer = Object.values(qa)[0];

    if (answer === user[question]) {
      await updateDoc(userRef, { verified: true });
      const updatedUserDoc = await getDoc(userRef);
      const updatedUser = updatedUserDoc.data();
      console.log("Yay : ");
      return res.json({ message: 'User verified successfully', verified: true, user: formatUserData(updatedUser) });
    } else {
      return res.status(401).json({ error: 'Incorrect answer to security question' });
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


const login = async (req, res) => {
  const { regNumberOrEmail, password } = req.body;

  try {
    console.log('Login request body:', req.body);

    const userQuery = await getDocs(
      query(
        usersCollection,
        or(
          where('registrationNo', '==', regNumberOrEmail.toUpperCase()),
          where('email', '==', regNumberOrEmail)
        )
      )
    );

    console.log('User query result:', userQuery);

    if (userQuery.empty) {
      console.log('User not found');
      return res.json({ message: 'User not found' });
    }

    const userData = userQuery.docs[0].data();
    console.log('User data:', userData);

    const hashedPassword = userData.password;


    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (isPasswordCorrect) {
      console.log('Login successful','\n\n',formatUserData(userData));
      return res.json({
        status: true,
        message: 'Login successful',
        ...formatUserData(userData),
      });
    } else {
      console.log('Incorrect password');
      return res.json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.error('Error checking password:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};



module.exports = {
  register,
  verifyUser,
  login
};

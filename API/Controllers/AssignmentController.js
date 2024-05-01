const { firestore } = require('../firebase.js');
const { collection, where, getDocs, getDoc, addDoc,doc,setDoc,arrayUnion } = require('firebase/firestore')


const getAssignmentsByYear = async (req, res) => {
    const { department, year } = req.params;
  
    try {
      // Ensure that the 'department' variable is set correctly
      console.log('Department:', department);
  
      const assignmentsDoc = doc(firestore, 'assignment', department, 'year', year+'00');
      const assignmentsDocSnapshot = await getDoc(assignmentsDoc);
  
      if (assignmentsDocSnapshot.exists()) {
        const assignmentsData = assignmentsDocSnapshot.data().assignments || [];
  
        // Transforming for each subject
        const transformedAssignments = assignmentsData.map((assignment) => ({
          subject: assignment.subject,
          numAssignments: 1, // Assuming each assignment counts as 1
          upcomingDates: [
            {
              date: assignment.deadline.toDate().toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
              }),
            },
          ],
          assignments: [assignment],
        }));
  
        console.log(transformedAssignments);
        res.status(200).json(transformedAssignments);
      } else {
        console.error(`Assignments document does not exist for year '${year}' in department '${department}'.`);
        res.status(404).json({ error: 'Assignments not found' });
      }
    } catch (error) {
      console.error('Error getting assignments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

//   const yearDocSnapshot = await getDoc(doc(collection(firestore, 'assignment', department), year));


const addAssignment = async (req, res) => {
  const { department, year } = req.params;
  const assignmentDetails = req.body;

  try {
    const assignmentsCollection = collection(firestore, 'assignment', department, 'year', year, 'assignments');
    const newAssignmentRef = await addDoc(assignmentsCollection, assignmentDetails);

    res.status(201).json({ id: newAssignmentRef.id, ...assignmentDetails });
  } catch (error) {
    console.error('Error adding assignment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const adAssignment = async (department, year, assignmentData) => {
    try {
      const assignmentDoc = doc(firestore, 'assignment', department, 'year', year);
  
      await setDoc(assignmentDoc, {
        assignments: arrayUnion(assignmentData)
      }, { merge: true });
  
      return { ...assignmentData };
    } catch (error) {
      console.error('Error adding assignment:', error);
      throw new Error('Internal Server Error');
    }
};

// const assignmentData = {
//     subject: 'CSC 283',
//     content: `
//       Assignment: In yet another 80 leaves notebook, distinguish between 100 ports in a computer system.
  
//       Why interface is important and examples of interface in the computer system?
  
//       Note:
//       You're required to fill the 80 leaves.
  
//       The assignment is to be submitted next week Tuesday🙂
//     `,
//     contentType: 'text',
//     dateGiven: new Date('2024-02-22'),
//     postedBy: 'Qitt',
//     deadline: new Date('2024-02-27'),
//   };

// const assignmentData = {
//     subject: 'CSC 284.1: LOGIC DESIGN',
//     content: `
//       Assignment: Understudy what is in the motherboard of a computer system, with focus on;
//       (i) Arithmetic and Logical unit
//       (ii) the Control Unit
//       (iii) the Memory system
//       (iv) the usefulness of the buses (control bus, data bus, and address bus)
  
//       Relate the function of the above-mentioned parts to;
//       (i) the processor
//       (ii) the operating system
  
//       The assignment is to fill an 80 leaves exercise book and to be submitted on the 4th of March.
//     `,
//     contentType: 'text',
//     dateGiven: new Date('2024-02-19'),
//     postedBy: 'Qitt',
//     deadline: new Date('2024-03-04'),
//   };
  
  
const assignmentData = {
  subject: "CSC 280.1",
  content: "Write a fotran program to calculate the area of a cylinder.\
  You are to print it with your full name and Department written as comment on the code.\
  ",
  contentType: "text",
  dateGiven: new Date("2024-03-15"),
  postedBy: "Qitt",
  deadline: new Date("2024-03-19"),
}

// {
//   subject: "MTH 270",
//   content: "Page 4 question 2 and 3 to be submitted on Thursday morning.",
//   contentType: "text",
//   dateGiven: new Date("2024-03-15"),
//   postedBy: "Qitt",
//   deadline: new Date("2024-03-21"),
// };
// {
//   subject: "CSC 283.1",
//   content: "With the aid of a diagram, draw and explain a file in words with 10 bank records. Using the index sequential file access, retrieve one of the records of your choice. On a fullscap to be submitted by March 8th and to be defended as well!",
//   contentType: "text",
//   dateGiven: new Date('2024-03-05'),
//   postedBy: "Qitt",
//   deadline: new Date('2024-03-08')
// }

  // adAssignment('computer_science','200',assignmentData)


module.exports = {
    getAssignmentsByYear,
    addAssignment
}
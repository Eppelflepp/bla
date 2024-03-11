import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCsEOdS4gp66K1Ly6irfeUug191HjEhvhg",
    authDomain: "bla-site.firebaseapp.com",
    projectId: "bla-site",
    storageBucket: "bla-site.appspot.com",
    messagingSenderId: "849249702041",
    appId: "1:849249702041:web:575c075fc07d720a92e808"
  };

// Initialize Firebase app
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = getFirestore(firebaseApp);

// Get the lesson status from Firestore
const lessonRef = doc(db, "lessons", "currentLesson");
getDoc(lessonRef).then((snapshot) => {
    if (snapshot.exists()) {
        const lessonData = snapshot.data();
        const lessonStatus = lessonData.isLessonOn ? "Er is (helaas) BLA." : "Geen BLA deze week!";
        document.getElementById("lesson-status").textContent = lessonStatus;

        // Details over de BLA
        lessonData.isLessonOn ? document.getElementById("details").textContent = lessonData.details : document.getElementById("details").textContent = ""

        // LastModified over de BLA
        document.getElementById("dateModified").textContent = "Laatst geupdate: " + lessonData.lastModified.toDate().toDateString();

        // Update background color based on lesson status
        if (lessonData.isLessonOn) {
            document.body.classList.add("lesson-on");
        } else {
            document.body.classList.add("lesson-off");
        }
    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.error("Error getting document:", error);
});

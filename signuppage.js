import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC57xjPB0qDZ0rSsmqXJvN_B8AdbN6j1c",
  authDomain: "shipgharhai.firebaseapp.com",
  projectId: "shipgharhai",
  storageBucket: "shipgharhai.appspot.com",
  messagingSenderId: "733427979009",
  appId: "1:733427979009:web:8c7a6e44cbb19ad16d4100",
  measurementId: "G-ZKY485EX9N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Toggle fields based on selected role
const skilledFields = document.getElementById("skilledFields");
const unskilledFields = document.getElementById("unskilledFields");

document.querySelectorAll('input[name="role"]').forEach(radio => {
  radio.addEventListener("change", () => {
    const role = document.querySelector('input[name="role"]:checked').value;
    if (role === "skilled" || role === "skilled-not-monetized") {
      skilledFields.style.display = "block";
      unskilledFields.style.display = "none";
      document.getElementById("skill").required = true;
      document.getElementById("experience").required = true;
      document.getElementById("skillToLearn").required = false;
    } else if (role === "unskilled") {
      skilledFields.style.display = "none";
      unskilledFields.style.display = "block";
      document.getElementById("skill").required = false;
      document.getElementById("experience").required = false;
      document.getElementById("skillToLearn").required = true;
    }
  });
});

window.handleSignup = async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const location = document.getElementById("location").value.trim();
  const role = document.querySelector('input[name="role"]:checked')?.value;

  if (!role) {
    alert("Please select a role.");
    return;
  }

  let userData = {
    name,
    email,
    role,
    location,
    createdAt: serverTimestamp()
  };

  // Add skill based on role
  if (role === "skilled" || role === "skilled-not-monetized") {
    const skill = document.getElementById("skill").value;
    const experience = document.getElementById("experience").value;
    userData.skill = skill;
    userData.experience = experience;
  } else if (role === "unskilled") {
    const skillToLearn = document.getElementById("skillToLearn").value;
    userData.skillToLearn = skillToLearn;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Store UID in localStorage for later use
    if (role === "skilled" || role === "skilled-not-monetized") {
      localStorage.setItem("skilledUID", uid);
    } else {
      localStorage.setItem("unskilledUID", uid);
    }

    // Store user in Firestore
    await setDoc(doc(db, "users", uid), userData);

    // Redirect to dashboard
    if (role === "skilled" || role === "skilled-not-monetized") {
      window.location.href = "skilled-dashboard.html";
    } else {
      window.location.href = "unskilled-dashboard.html";
    }

  } catch (error) {
    console.error("Signup failed:", error);
    alert("Signup failed: " + error.message);
  }
};

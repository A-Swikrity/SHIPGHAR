
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    import {
      getFirestore,
      collection,
      addDoc,
      serverTimestamp,
      doc,
      getDoc,
      query,
      where,
      getDocs,
    } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";

    const firebaseConfig = {
      apiKey: "AIzaSyAC57xjPB0qDZ0rSsmqXJvN_B8AdbN6j1c",
      authDomain: "shipgharhai.firebaseapp.com",
      projectId: "shipgharhai",
      storageBucket: "shipgharhai.appspot.com",
      messagingSenderId: "733427979009",
      appId: "1:733427979009:web:8c7a6e44cbb19ad16d4100",
      measurementId: "G-ZKY485EX9N",
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

   const uid = localStorage.getItem('unskilledUID');
    if (!uid) {
      alert("User not identified. Please sign up first.");

    }

    let currentUserData = null;

    // Load user profile by uid
    async function loadUserProfile() {
      try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          currentUserData = data;

          document.getElementById("profile-name").textContent = data.name || "";
          document.getElementById("profile-email").textContent = data.email || "";
          document.getElementById("profile-skill").textContent = data.skillToLearn || "Not specified";
          document.getElementById("profile-experience").textContent = "N/A";
          document.getElementById("profile-location").textContent = data.location || "N/A";
        } else {
          alert("User data not found. Please sign up again.");
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        alert("Failed to load profile.");
      }
    }
    
    async function fetchMentors() {
      const mentorsListDiv = document.getElementById("mentors-list");
      mentorsListDiv.innerHTML = "<p>Loading mentors...</p>";

      try {
        const q = query(collection(db, "users"), where("role", "==", "skilled"));
        const querySnapshot = await getDocs(q);
        mentorsListDiv.innerHTML = "";

        if (querySnapshot.empty) {
          mentorsListDiv.innerHTML = "<p>No skilled mentors found.</p>";
          return;
        }

        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const mentorCard = document.createElement("div");
          mentorCard.className = "profile-card";
          mentorCard.innerHTML = `
            <div class="profile-info">
              <p><strong>Name:</strong> ${data.name || "N/A"}</p>
              <p><strong>Email:</strong> ${data.email || "N/A"}</p>
              <p><strong>Skill:</strong> ${data.skill || "N/A"}</p>
              <p><strong>Experience:</strong> ${data.experience || "N/A"}</p>
              <p><strong>Location:</strong> ${data.location || "N/A"}</p>
              <button class="edit-btn" onclick="requestMentorship('${data.email}', '${data.name}', '${data.skill}')">Request For Mentorship</button>
            </div>
          `;
          mentorsListDiv.appendChild(mentorCard);
        });
      } catch (error) {
        mentorsListDiv.innerHTML = "<p>Error loading mentors.</p>";
        console.error("Error fetching mentors:", error);
      }
    }

    // Send mentorship request with current user info
    async function requestMentorship(mentorEmail, mentorName, skill) {
      if (!currentUserData) {
        alert("User data not loaded yet.");
        return;
      }

      try {
        await addDoc(collection(db, "mentorship_requests"), {
          mentorId: mentorEmail,
          mentorName: mentorName,
          menteeId: currentUserData.email,
          menteeName: currentUserData.name,
          skill: skill,
          status: "pending",
          timestamp: serverTimestamp(),
        });
        alert("Mentorship request sent!");
      } catch (e) {
        console.error("Error sending request: ", e);
        alert("Failed to send request.");
      }
    }
    window.fetchMentors = fetchMentors;
    window.requestMentorship = requestMentorship;

    function showSection(id) {
      document.querySelectorAll(".main-content > div").forEach((el) => (el.style.display = "none"));
      const target = document.getElementById(id);
      if (target) target.style.display = "block";
    }
    window.showSection = showSection;

    loadUserProfile();
    
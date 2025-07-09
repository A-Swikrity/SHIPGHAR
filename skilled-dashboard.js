
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
    import {
      getFirestore,
      collection,
      query,
      where,
      getDocs,
      updateDoc,
      doc,
      getDoc,
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

    //get the user UID from localStorage set during signup
   const uid = localStorage.getItem('skilledUID');
    if (!uid) {
      alert("User not identified. Please sign up first.");
    }

    // Store the user's email
    let currentUserEmail = null;

    // Fetch user profile by uid and display on page
    async function loadUserProfile() {
      try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          currentUserEmail = data.email; 

          document.getElementById("profile-name").textContent = data.name || "";
          document.getElementById("profile-email").textContent = data.email || "";
          document.getElementById("profile-skill").textContent = data.skill || "N/A";
          document.getElementById("profile-experience").textContent = data.experience || "N/A";
          document.getElementById("profile-location").textContent = data.location || "N/A";
        } else {
          alert("User data not found. Please sign up again.");
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        alert("Failed to load profile.");
      }
    }

    // Fetch mentorship requests where current user is mentor
    async function fetchRequests() {
      if (!currentUserEmail) {
        alert("Mentor email not loaded yet.");
        return;
      }
      try {
        const q = query(
          collection(db, "mentorship_requests"),
          where("mentorId", "==", currentUserEmail)
        );
        const snapshot = await getDocs(q);
        const requestListDiv = document.getElementById("requests-list");
        requestListDiv.innerHTML = "";

        snapshot.forEach((docSnap) => {
          const data = docSnap.data();
          const requestCard = document.createElement("div");
          requestCard.className = "profile-card";
          requestCard.innerHTML = `
            <div class="profile-info">
              <p><strong>Name:</strong> ${data.menteeName}</p>
              <p><strong>Email:</strong> ${data.menteeId}</p>
              <p><strong>Skill:</strong> ${data.skill}</p>
              <p><strong>Status:</strong> ${data.status}</p>
              ${
                data.status === "pending"
                  ? `<button class="edit-btn" onclick="acceptRequest('${docSnap.id}')">Accept</button>`
                  : `<p style="color: green;">Accepted</p>`
              }
            </div>
          `;
          requestListDiv.appendChild(requestCard);
        });
      } catch (error) {
        alert("Failed to fetch mentorship requests: " + error.message);
      }
    }

    // Accept mentorship request and update Firestore
    async function acceptRequest(docId) {
      try {
        const reqRef = doc(db, "mentorship_requests", docId);
        await updateDoc(reqRef, { status: "accepted" });
        alert("Request Accepted!");
        fetchRequests();
      } catch (e) {
        alert("Error accepting request: " + e.message);
      }
    }

    window.fetchRequests = fetchRequests;
    window.acceptRequest = acceptRequest;

    // Show/hide sections
    function showSection(id) {
      document.querySelectorAll(".main-content > div").forEach((el) => (el.style.display = "none"));
      const target = document.getElementById(id);
      if (target) target.style.display = "block";
    }
    window.showSection = showSection;

    loadUserProfile();

    //product list 
const productsSection = document.getElementById("products-section");
const productsList = document.getElementById("products-list");
const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");
const cancelAddProductBtn = document.getElementById("cancel-add-product");
let products = [];

// Handle image upload 
function handleImageUpload(callback) {
  const fileInput = document.getElementById("product-image");
  const file = fileInput.files[0];

  if (!file) {
    callback(null); 
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result); 
  };
  reader.readAsDataURL(file);
}

// Render products as cards
function renderProducts() {
  productsList.innerHTML = "";

  if (products.length === 0) {
    productsList.innerHTML = "<p>No products listed yet.</p>";
    return;
  }

  products.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      ${prod.image ? `<img src="${prod.image}" alt="${prod.name}" style="width:100%; height:180px; object-fit:cover; border-radius:8px;" />` : ""}
      <h3>${prod.name}</h3>
      <p class="price">Rs. ${prod.price}</p>
      <p><strong>Category:</strong> ${prod.category}</p>
      <p>${prod.description}</p>
    `;
    productsList.appendChild(card);
  });
}

// Show add product form
addProductBtn.addEventListener("click", () => {
  addProductForm.style.display = "block";
  addProductBtn.style.display = "none";
});

// Cancel add product
cancelAddProductBtn.addEventListener("click", () => {
  addProductForm.style.display = "none";
  addProductBtn.style.display = "inline-block";
  addProductForm.reset();
});

// Submit new product
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  handleImageUpload((base64Image) => {
    const newProduct = {
      id: products.length + 1,
      name: document.getElementById("product-name").value.trim(),
      price: parseFloat(document.getElementById("product-price").value),
      category: document.getElementById("product-category").value.trim(),
      description: document.getElementById("product-description").value.trim(),
      image: base64Image || null
    };

    products.push(newProduct);
    renderProducts();

    addProductForm.style.display = "none";
    addProductBtn.style.display = "inline-block";
    addProductForm.reset();
  });
});

// Sidebar show section 
window.showSection = function (id) {
  document.querySelectorAll(".main-content > div").forEach((el) => (el.style.display = "none"));
  const target = document.getElementById(id);
  if (target) target.style.display = "block";

  if (id === "products-section") {
    renderProducts();
  }
};


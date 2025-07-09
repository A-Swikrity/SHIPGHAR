//Firebase Setup 
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, query, orderBy, onSnapshot
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAC57xjPB0qDZ0rSsmqXJvN_B8AdbN6j1c",
      authDomain: "shipgharhai.firebaseapp.com",
      projectId: "shipgharhai",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

let currentUserId = "";
let receiverId = ""; 
let chatId = "";

// currennt users
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUserId = user.uid;
    console.log("Logged in as:", currentUserId);
  } else {
    alert("Please log in to use chat.");
  }
});

// open chat with other user
window.startChatWith = function (otherUserId) {
  receiverId = otherUserId;
  chatId = currentUserId < receiverId
    ? `${currentUserId}_${receiverId}`
    : `${receiverId}_${currentUserId}`;

  document.getElementById("chat-section").style.display = "block";
  loadMessages();
};

// load messages
function loadMessages() {
  const chatBox = document.getElementById("chat-box");
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("timestamp"));

  onSnapshot(q, (snapshot) => {
    chatBox.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const align = msg.senderId === currentUserId ? "right" : "left";
      chatBox.innerHTML += `<p style="text-align:${align};">${msg.text}</p>`;
    });
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}

// send messages
window.sendMessage = async function () {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;

  const messagesRef = collection(db, "chats", chatId, "messages");
  await addDoc(messagesRef, {
    senderId: currentUserId,
    text: text,
    timestamp: new Date()
  });

  input.value = "";
};

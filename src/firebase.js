import firebase from 'firebase';

// Initialize Firebase
const config = {
  apiKey: "AIzaSyDxcrrpA81ZE-eJcEM91_1w5ANaXXFmuHA",
  authDomain: "ticket-desk.firebaseapp.com",
  databaseURL: "https://ticket-desk.firebaseio.com",
  projectId: "ticket-desk",
  storageBucket: "",
  messagingSenderId: "847730774773"
};
firebase.initializeApp(config);

export default firebase;
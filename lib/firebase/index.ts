import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
    apiKey: "AIzaSyBnOQpveEftAVY2ieDj_GV6qKibYCZRPqI",
    authDomain: "que-club-e.firebaseapp.com",
    projectId: "que-club-e",
    storageBucket: "que-club-e.appspot.com",
    messagingSenderId: "657004317196",
    appId: "1:657004317196:web:17b363a95dd9fa567efc29"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const database = firebase.firestore()

export { database };
export default firebase;

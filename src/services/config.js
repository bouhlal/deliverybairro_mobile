import firebase from "firebase/app";
import '@firebase/database';
import '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6YSUb6L47sKu1ykiKFSsfdTfJNmhlgx4',
  appId: '1:118623960431:android:c14bce16edbb08c9e87c9a',
  projectId: 'deliverybairro-app-d259e',
  authDomain: 'deliverybairro-app-d259e.firebaseapp.com',
  databaseURL: 'https://deliverybairro-app-d259e-default-rtdb.firebaseio.com',
  storageBucket: 'deliverybairro-app-d259e.appspot.com',
  messagingSenderId: '118623960431',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default firebase;

// import { API_KEY, 
//   AUTH_DOMAIN, DATABASE_URL, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID,
//   APP_ID, MEASUREMENT_ID } from '@env';

/*
import firebase, { initializeApp } from '@firebase/app';
import { getMessaging } from '@firebase/messaging'
import { getDatabase } from '@firebase/database';
import { getAuth } from '@firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC6YSUb6L47sKu1ykiKFSsfdTfJNmhlgx4',
  appId: '1:118623960431:android:c14bce16edbb08c9e87c9a',
  projectId: 'deliverybairro-app-d259e',
  authDomain: 'deliverybairro-app-d259e.firebaseapp.com',
  databaseURL: 'https://deliverybairro-app-d259e-default-rtdb.firebaseio.com',
  storageBucket: 'deliverybairro-app-d259e.appspot.com',
  messagingSenderId: '118623960431',
}

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const messaging = getMessaging(app);

export { 
  auth, database, messaging, firebase as default 
};
*/
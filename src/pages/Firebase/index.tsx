import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'solid-firebase';
import { createSignal, For } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import { Room } from '@/game_logic/Game';
import styles from '@/pages/Firebase/Firebase.module.scss';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const q = query(collection(db, 'messages'));

const unsubscribe = onSnapshot(q, querySnapshot => {
  const messages: string[] = [];
  querySnapshot.forEach(doc => {
    messages.push(doc.data().text);
  });
  console.log('I am subscribed');
});

const auth = getAuth(firebaseApp);

const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User registered:', user.uid);
  } catch (error) {
    console.error('Registration error');
  }
};

const signInUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('User signed in:', user.uid);
  } catch (error) {
    console.error('Sign-in error');
  }
};

const signOutUser = () => {
  unsubscribe();
  signOut(auth);
};

const postMessage = async (message: string) => {
  const docRef = await addDoc(collection(db, 'messages'), {
    createdAt: serverTimestamp(),
    text: message,
  });
  console.log('Document written with ID: ', docRef.id);
};

const boardTester = () => {
  const room = new Room(0);
  console.log(room);

  return (
    <div>
      <For each={room.players[0].board.duchy}>
        {(row, rowIndex) => (
          <div>
            <For each={row}>
              {(cell, cellIndex) => cell != null && <button onClick={() => cell.addTile}>This is a HexSpace</button>}
            </For>
          </div>
        )}
      </For>
      <br> </br>
      <For each={room.centralBoard.outerBoard}>
        {(row, rowIndex) => (
          <div>
            <For each={row.hex}>
              {(cell, cellIndex) => cell != null && <button onClick={() => cell.addTile}>This is a HexSpace</button>}
            </For>
          </div>
        )}
      </For>
    </div>
  );
};

export const Firebase = () => {
  const context = useGlobalContext();

  const [password, setPassword] = createSignal('');
  const state = useAuth(getAuth(firebaseApp));

  const [message, setMessage] = createSignal('');

  return (
    <div class={styles.Firebase}>
      <h1>Firebase</h1>

      {!state.data ? (
        <>
          <input placeholder="Enter email here" onChange={e => context.setEmail(e.currentTarget.value)} />
          <input placeholder="Enter password here" onChange={e => setPassword(e.currentTarget.value)} />
          <button onClick={() => registerUser(context.email(), password())}>Register</button>
          <button
            onClick={() => {
              signInUser(context.email(), password());
            }}
          >
            Sign In
          </button>
        </>
      ) : (
        <>
          <button onClick={() => signOutUser()}>Sign Out</button>
          <input placeholder="Enter message here" onChange={e => setMessage(e.currentTarget.value)} />
          <button onClick={() => postMessage(message())}>Send Message</button>
          <br />
          <button onClick={() => boardTester()}>Test the Board</button>
          {boardTester()}
          <br />
        </>
      )}
    </div>
  );
};

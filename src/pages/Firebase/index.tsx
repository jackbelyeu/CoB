import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { useAuth } from 'solid-firebase';
import { Show, createSignal } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import { Game } from '@/game_logic/Game';
import { GameUI } from '@/game_logic/GameUI';
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
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

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
  signOut(auth);
};

const generateSessionId = () => {
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  let sessionId = '';
  for (let j = 0; j < 5; j++) {
    sessionId += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
  }
  return sessionId;
};

const createSession = () => {
  const sessionId = generateSessionId();
  const reference = ref(db, `session/${sessionId}`);
  console.log(sessionId);
  set(reference, new Game());
};

const attachListener = (sessionId: string): Promise<Game> => {
  return new Promise((resolve, reject) => {
    const sessionReference = ref(db, `session/${sessionId}`);
    onValue(
      sessionReference,
      snapshot => {
        const data = snapshot.val();
        if (data) {
          console.log(data);
          resolve(data);
        } else {
          reject(new Error('Data not found in database.'));
        }
      },
      error => {
        console.error('Error fetching data from database.', error);
        reject(error);
      }
    );
  });
};

const updateSession = (sessionId: string, game: Game) => {
  const reference = ref(db, `session/${sessionId}`);
  set(reference, game);
};

export const Firebase = () => {
  const context = useGlobalContext();

  const state = useAuth(getAuth(firebaseApp));

  const [password, setPassword] = createSignal('');
  const [sessionId, setSessionId] = createSignal('');

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
          <input placeholder="Enter session id here" onChange={e => setSessionId(e.currentTarget.value)} />
          <button
            onClick={() => {
              createSession();
            }}
          >
            Create Session
          </button>
          <button
            onClick={async () => {
              context.setGame(await attachListener(sessionId()));
            }}
          >
            Join Session
          </button>
          <button
            onClick={() => {
              updateSession(sessionId(), context.game());
            }}
          >
            Update Session
          </button>

          <Show when={context.game()}>
            <GameUI />
          </Show>
        </>
      )}
    </div>
  );
};

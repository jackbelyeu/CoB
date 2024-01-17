import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';
import { useAuth } from 'solid-firebase';
import { createSignal, Show } from 'solid-js';
import { useGlobalContext } from '@/context/GlobalContext';
import { Room } from '@/game_logic/Game';
import { GameUI } from '@/game_logic/gameUI';
import { gameFunctions } from '@/game_logic/hex';
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
const db = getFirestore(firebaseApp);
const rtdb = getDatabase(firebaseApp);

const q = query(collection(db, 'messages'));
const unsubscribe = onSnapshot(q, querySnapshot => {
  const messages: string[] = [];
  querySnapshot.forEach(doc => {
    messages.push(doc.data().text);
  });
  console.log('I am subscribed');
});

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

const setRoomToRealtimeDatabase = (room: Room) => {
  const reference = ref(rtdb, `game/${room.roomCode}`);

  set(reference, room);
};

const getRoomFromDatabase = (roomCode: string): Promise<Room> => {
  return new Promise((resolve, reject) => {
    const gameReference = ref(rtdb, `game/${roomCode}`);
    onValue(
      gameReference,
      snapshot => {
        const data: Room | null = snapshot.val();
        if (data) {
          resolve(data);
        } else {
          reject(new Error('Room not found in database.'));
        }
      },
      error => {
        console.error('Error fetching room from database.', error);
        reject(error);
      }
    );
  });
};

const createRoom = (roomCode: string, pId: string) => {
  const newRoom = new Room(roomCode, pId);
  console.log(`Room Created with Code ${newRoom.roomCode}`);
  setRoomToRealtimeDatabase(newRoom);
};

const joinRoom = async (roomCode: string, pId: string) => {
  const room = gameFunctions.addPlayer(await getRoomFromDatabase(roomCode), pId);
  console.log(`Room Joined with Code ${room.roomCode}`);
  setRoomToRealtimeDatabase(room);
  return room;
};

export const Firebase = () => {
  const context = useGlobalContext();

  const state = useAuth(getAuth(firebaseApp));

  const [password, setPassword] = createSignal('');
  const [message, setMessage] = createSignal('');
  const [roomCode, setRoomCode] = createSignal('');

  const [room, setRoom] = createSignal<Room>();

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
          <input placeholder="Enter room code here" onChange={e => setRoomCode(e.currentTarget.value)} />
          <button
            onClick={async () => {
              if (state.data) {
                createRoom(roomCode(), state.data.uid);
                setRoom(await joinRoom(roomCode(), state.data.uid));
              }
            }}
          >
            Create Room
          </button>
          <button
            onClick={async () => {
              if (state.data) {
                setRoom(await joinRoom(roomCode(), state.data.uid));
              }
            }}
          >
            Join Room
          </button>
          <Show when={room() != null}>
            <GameUI room={room()!} />
          </Show>
        </>
      )}
    </div>
  );
};

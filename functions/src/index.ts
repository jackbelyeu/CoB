/**
 * Import function triggers from their respective submodules:
 *
 * import { onCall } from 'firebase-functions/v2/https';
 * import { onDocumentWritten } from 'firebase-functions/v2/firestore';
 */

import admin, { type ServiceAccount } from 'firebase-admin';
import * as logger from 'firebase-functions/logger';
import { onRequest } from 'firebase-functions/v2/https';
import serviceAccount from '../serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: 'https://first-firebase-app-74753-default-rtdb.firebaseio.com',
});

const db = admin.database();

// Start writing functions https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((req, res) => {
  logger.info('Hello logs!');
  res.send('Hello from Firebase!');
});

type RequestSwapHexes = { sessionId: string; swapFrom: any; swapTo: any };

export const swapHexes = onRequest((req, res) => {
  const body: RequestSwapHexes = JSON.parse(req.body);
  const ref = db.ref(`session/${body.sessionId}`);

  ref.set('hello world');

  logger.info(req, { structuredData: true });
  res.send('success');
});

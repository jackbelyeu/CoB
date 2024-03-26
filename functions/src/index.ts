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

export const postGame = onRequest((req, res) => {
  const body = req.body;
  const ref = db.ref(`session/${body.sessionId}`);

  ref.set(body.game);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const swapHexes_mainBoardToStorage = onRequest((req, res) => {
  const body = req.body;
  const ref_swapFrom = db.ref(
    `session/${body.sessionId}/gameBoard/depots/${body.depotNumber}/${body.depotPosition}/hex/type`
  );
  const ref_swapTo = db.ref(`session/${body.sessionId}/players/${body.playerNumber}/storage/${body.storageNumber}/hex`);

  ref_swapFrom.set(8); // Sets giver hex to empty
  ref_swapTo.set(body.hexToSwap);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const swapHexes_storageToEstate = onRequest((req, res) => {
  const body = req.body;
  const ref_swapFrom = db.ref(
    `session/${body.sessionId}/players/${body.playerNumber}/storage/${body.storageNumber}/hex/type`
  );
  const ref_swapTo = db.ref(
    `session/${body.sessionId}/players/${body.playerNumber}/estate/${body.estateRow}/${body.estateCol}/hex`
  );

  ref_swapFrom.set(8); // Sets giver hex to empty
  ref_swapTo.set(body.hexToSwap);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const createGame = onRequest((req, res) => {
  const body = req.body;
  const ref = db.ref(`session/${body.sessionId}`);

  ref.set(body.game);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const rollDice = onRequest((req, res) => {
  const body = req.body;
  const ref = db.ref(`session/${body.sessionId}/players/0/dice/0/value`);
  const ref2 = db.ref(`session/${body.sessionId}/players/0/dice/1/value`);
  const ref3 = db.ref(`session/${body.sessionId}/players/1/dice/0/value`);
  const ref4 = db.ref(`session/${body.sessionId}/players/1/dice/1/value`);

  ref.set(Math.floor(Math.random() * 6) + 1);
  ref2.set(Math.floor(Math.random() * 6) + 1);
  ref3.set(Math.floor(Math.random() * 6) + 1);
  ref4.set(Math.floor(Math.random() * 6) + 1);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const changeSilverlings = onRequest((req, res) => {
  const body = req.body;
  const ref = db.ref(`session/${body.sessionId}/players/${body.playerNumber}/silverlings`);

  ref.set(body.number);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

export const changeWorkers = onRequest((req, res) => {
  const body = req.body;
  const ref = db.ref(`session/${body.sessionId}/players/${body.playerNumber}/workers`);

  ref.set(body.number);

  logger.info(req, { structuredData: true });
  res.send(JSON.stringify({ result: 'success' }));
});

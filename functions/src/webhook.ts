import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const WA_VERIFY_TOKEN = process.env.VERIFY_TOKEN;

export const whatsappWebhook = onRequest((req, res) => {
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === WA_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }

  if(req.method === 'POST') {
    const body = req.body;

    if(body.object === 'whatsapp_business_account') {
      body.entry.forEach((entry:any) => {
        const changes = entry.changes;
        changes.forEach(async (change: any) => {
          if (change.field === 'messages' || change.field === 'message_status') {
            const value = change.value;

            // Log or store the message status (e.g., delivered, failed)
            console.log('Received status update:', JSON.stringify(value, null, 2));
            // Optionally store in Realtime DB or Firestore
            await admin.firestore().collection('whatsapp_status').add(value);
          }
        });
      });

      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
});

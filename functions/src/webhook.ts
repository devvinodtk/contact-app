import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';

const WA_VERIFY_TOKEN = process.env.VERIFY_TOKEN;

interface WhatsAppMessage {
  from: string; // sender's WhatsApp number
  id?: string;
  timestamp?: string;
  type?: string;
  text?: { body: string };
}

interface WhatsAppChangeValue {
  messages?: WhatsAppMessage[];
}

interface WhatsAppChange {
  field: string;
  value: WhatsAppChangeValue;
}

interface WhatsAppEntry {
  id: string;
  changes: WhatsAppChange[];
}

interface WhatsAppWebhookBody {
  object: string;
  entry: WhatsAppEntry[];
}

export const whatsappWebhook = onRequest(
  (req, res): void => {
    // ✅ Step 1: Verification handshake
    if (req.method === 'GET') {
      const mode = req.query['hub.mode'];
      const token = req.query['hub.verify_token'];
      const challenge = req.query['hub.challenge'];

      if (mode && token && mode === 'subscribe' && token === WA_VERIFY_TOKEN) {
        console.log('Webhook verified successfully');
        res.status(200).send(challenge as string);
        return;
      }
      console.error('Webhook verification failed');
      res.sendStatus(403);
      return;
    }

    // ✅ Step 2: Handle incoming messages
    if (req.method === 'POST') {
      try {
        const body = req.body as WhatsAppWebhookBody;

        if (body.object === 'whatsapp_business_account') {
          body.entry.forEach((entry: WhatsAppEntry) => {
            entry.changes.forEach((change: WhatsAppChange) => {
              if (
                change.field === 'messages'
                && change.value.messages
                && change.value.messages[0]
              ) {
                const message = change.value.messages[0];
                const { from } = message; // User's WhatsApp number
                const text = message.text?.body || '';

                console.log(`📩 Received from ${from}: ${text}`);

                // Save opt-in to Realtime DB
                const userRef = admin.database().ref(`/whatsappUsers/${from}`);
                userRef.set({
                  optedIn: true,
                  lastMessage: text,
                  timestamp: Date.now(),
                });
              }
            });
          });
        }

        res.sendStatus(200);
        return;
      } catch (err) {
        console.error('Error handling webhook', err);
        res.sendStatus(500);
        return;
      }
    }

    res.sendStatus(404);
  },
);

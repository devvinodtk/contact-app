import * as functions from "firebase-functions";
import fetch from "node-fetch";

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WA_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export const sendUserSignUpWhatsAppMessage = functions.https.onCall(async(request, context) => {

  const {phoneNumber, memberName} = request.data;
  const apiUrl = `https://graph.facebook.com/v21.0/${WA_PHONE_NUMBER_ID}/messages`;

  const recipientPhoneNumber = phoneNumber.replace(/\D/g, '');

  const payload = {
    "messaging_product": "whatsapp",
    "to": recipientPhoneNumber,
    "type": "template",
    "template": {
      "name": "registration_confirmation",
      "language": {
        "code": "en_US"
      },
      "components": [
        {
          "type": "body",
          "parameters": [
            {
              "type": "text",
              "text": memberName
            }
          ]
        }
      ]
    }
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${WA_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    })

    const result = await res.json();

    if (!res.ok) {
      const errorMsg = result && typeof(result) === 'object'
      && "error" in result
      && typeof(result as any).error === "object"
      && "message" in (result as any).error;
      throw new functions.https.HttpsError('internal', `Error: ${errorMsg}`);
    }
    return ('Successfully notified the member via WhatsApp');
  } catch (error) {

  }
});
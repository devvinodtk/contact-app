
const WA_PHONE_NUMBER_ID = import.meta.env.VITE_WHATSAPP_PHONE_NUMBER_ID;
const ACCESS_TOKEN = import.meta.env.VITE_WHATSAPP_ACCESS_TOKEN;
const apiUrl = `https://graph.facebook.com/v21.0/${WA_PHONE_NUMBER_ID}/messages`;

export const sendUserSignUpWhatsAppMessage = async (phoneNumber: string, memberName: string) => {
  if (!phoneNumber || !memberName) {
    console.log('Please provide phone number, name and profile link.');
    return;
  }

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
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return ('Successfully notified the member via WhatsApp');
    } else {
       throw Error(`Error: ${data.error.message}`);
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    throw Error(`Failed to send message. Error: ${error}`);
  }
}

export const sendMemberVerifiedWhatsAppMessage = async (phoneNumber: string, memberName: string, profileLink: string) => {
  if (!phoneNumber || !memberName || !profileLink) {
    console.log('Please provide phone number, name and profile link.');
    return;
  }

  const recipientPhoneNumber = phoneNumber.replace(/\D/g, '');

  const payload = {
    "messaging_product": "whatsapp",
    "to": recipientPhoneNumber,
    "type": "template",
    "template": {
      "name": "member_verification_confirmation_dev",
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
        },
        {
          "type": "button",
          "sub_type": "url",
          "index": 0,
          "parameters": [
            {
              "type": "text",
              "text": profileLink
            }
          ]
        }
      ]
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      return ('Successfully notified the member via WhatsApp');
    } else {
       throw Error(`Error: ${data.error.message}`);
    }
  } catch (error) {
    console.error('Failed to send message:', error);
    throw Error(`Failed to send message. Error: ${error}`);
  }
};

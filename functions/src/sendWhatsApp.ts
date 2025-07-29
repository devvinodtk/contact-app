import { onCall, HttpsError } from "firebase-functions/v2/https";
import {MessageTemplates, MessageParams, MessagePayload, Component} from "./types/message-template";

const WA_ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
const WA_PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

export const sendUserSignUpWhatsAppMessage = onCall(async(request, context) => {

  const {phoneNumber, memberName} = request.data;
  if (!phoneNumber || !memberName) {
    throw new HttpsError('internal','Please provide phone number and name');
  }

  const recipientPhoneNumber = phoneNumber.replace(/\D/g, '');
  const payload = constructMessagePayload(MessageTemplates.reg_confirmation, {memberName, phoneNumber: recipientPhoneNumber})

  return sendWhatsAppMessage(payload);

});

export const sendMemberVerifiedWhatsAppMessage = onCall(async(request, context) => {
  const {phoneNumber, memberName, profileLink} = request.data;

  if (!phoneNumber || !memberName || !profileLink) {
    throw new HttpsError('internal','Please provide phone number, name and profile link');
  }

  const recipientPhoneNumber = phoneNumber.replace(/\D/g, '');
  const payload = constructMessagePayload(MessageTemplates.member_verified_dev, {memberName, phoneNumber: recipientPhoneNumber, profileLink})

  return sendWhatsAppMessage(payload);
});

const sendWhatsAppMessage = async (payload: MessagePayload) => {
  const apiUrl = `https://graph.facebook.com/v21.0/${WA_PHONE_NUMBER_ID}/messages`;

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
      throw new HttpsError('internal', `Error: ${errorMsg}`);
    }
    return ('Successfully notified the member via WhatsApp');
  } catch (error) {
    throw new HttpsError('internal', `Error: ${error}`);
  }
}

const constructMessagePayload = (mTemplate: MessageTemplates, data: MessageParams) => {

  const messageComponents: Array<Component> = [{
    type: "body",
    parameters: [
      {
        type: "text",
        text: data.memberName
      }
    ]
  }]

  if(mTemplate === MessageTemplates.member_verified_dev && data.profileLink) {
    messageComponents.push(
      {
        type: "button",
        sub_type: "url",
        index: 0,
        parameters: [
          {
            type: "text",
            text: data.profileLink
          }
        ]
      }
    )
  }
  const payload: MessagePayload = {
    messaging_product: "whatsapp",
    to: data.phoneNumber,
    type:"template",
    template: {
      name: mTemplate,
      language: {code : "en_US" },
      components: messageComponents
    }
  }

  return payload;
}
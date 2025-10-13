import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import admin from 'firebase-admin';
import express, { Response } from 'express';
import chromium from 'chrome-aws-lambda';
import puppeteer from 'puppeteer-core';
import cors from 'cors';
import path from 'path';
import ejs from 'ejs';
import { Members } from './types/Members';

admin.initializeApp();
const db = admin.database();
const app = express();
app.use(cors({ origin: ['http://localhost:5173', 'https://kk-contact-app.web.app', 'https://members.kalakairali.com/', 'https://kalakairali-mms.web.app'] }));
// app.use(cors({ origin: ["https://kk-contact-app.web.app"] }));
// app.use(cors({ origin: ["https://kalakairali-mms.web.app"] }));

setGlobalOptions({
  memory: '1GiB',
  cpu: 1,
  timeoutSeconds: 120,
  region: 'us-central1',
});

const generatePDFFile = async (html: string, res: Response) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'a4',
    printBackground: false,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px',
    },
  });

  await browser.close();

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="records.pdf"',
    'Content-Length': pdfBuffer.length,
  });
  return res.send(pdfBuffer);
};

app.get('/generate-phone-list', async (req, res) => {
  try {
    const snapshot = await db.ref('/kalakairali/members').once('value');
    const records = snapshot.val();
    if (!records) {
      return res.status(404).send('No records found');
    }

    const templatePath = path.join(__dirname, 'templates', 'phone-number-list.ejs');
    const members = Object.entries(records || {}).map(([key, value]: [string, any]) => ({
      memberId: value.memberId,
      isInactive: value.isInactive,
      verified: value.verified,
      personalDetails: {
        name: value.personalDetails?.name ?? '',
        mobileNumber: value.personalDetails?.mobileNumber ?? '',
      },
      presentAddress: {
        postOffice: value.presentAddress?.postOffice,
      },
    }));

    const activeMembers = members/* .filter((member) => !member.isInactive && member.verified) */
      .sort((a, b) => a.personalDetails.name.localeCompare(b.personalDetails.name));

    const generatedOn = new Date()
      .toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
      .replace(/am|pm/, (match) => match.toUpperCase());
    const html = await ejs.renderFile(templatePath, { members: activeMembers, generatedOn });
    return generatePDFFile(html, res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).send('Error generating PDF');
  }
});

app.get('/generate-pdf', async (req, res) => {
  try {
    const snapshot = await db.ref('/kalakairali/members').once('value');
    const records = snapshot.val();
    if (!records) {
      return res.status(404).send('No records found');
    }
    const members = Object.entries(records || {}).map(([key, value]: [string, any]) => ({
      memberId: value.memberId,
      isInactive: value.isInactive,
      verified: value.verified,
      personalDetails: {
        name: value.personalDetails?.name ?? '',
        mobileNumber: value.personalDetails?.mobileNumber ?? '',
      },
      presentAddress: {
        flatNumberName: value.presentAddress?.flatNumberName ?? '',
        addressLine1: value.presentAddress?.addressLine1 ?? '',
        addressLine2: value.presentAddress?.addressLine2 ?? '',
        postOffice: value.presentAddress?.postOffice ?? '',
        city: value.presentAddress?.city ?? '',
        state: value.presentAddress?.state ?? '',
        pincode: value.presentAddress?.pincode ?? '',
        contactNumber: value.presentAddress?.contactNumber ?? '',
      },
    }));

    const activeMembers: Array<Members> = members/* .filter((member) => !member.isInactive && member.verified) */
      .sort((a, b) => a.personalDetails.name.localeCompare(b.personalDetails.name));

    const templatePath = path.join(__dirname, 'templates', 'address-list.ejs');
    const html = await ejs.renderFile(templatePath, { members: activeMembers });
    return generatePDFFile(html, res);
  } catch (error) {
    console.error('Error generating PDF:', error);
    return res.status(500).send('Error generating PDF');
  }
});

export { sendMemberVerifiedWhatsAppMessage, sendUserSignUpWhatsAppMessage } from './sendWhatsApp';
export const api = onRequest(app);
export { whatsappWebhook } from './webhook';

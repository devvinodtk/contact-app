import { onRequest } from 'firebase-functions/v2/https';
import { setGlobalOptions } from 'firebase-functions/v2';
import admin from "firebase-admin";
import express from "express";
import chromium from 'chrome-aws-lambda';
import puppeteer from "puppeteer-core";
import cors from 'cors';

admin.initializeApp();
const db = admin.database();
const app = express();
//app.use(cors({ origin: ["http://localhost:5173", "https://kk-contact-app.web.app"] }));
app.use(cors({ origin: ["https://kk-contact-app.web.app"] }));
//app.use(cors({ origin: ["https://kalakairali-mms.web.app"] }));

setGlobalOptions({
  memory: '1GiB',
  cpu: 1,
  timeoutSeconds: 120,
  region: 'us-central1'
});

function generateHTML(members: any[]): string {
  // Group members into rows of 3
  const groupedRows: string[] = [];
  for (let i = 0; i < members.length; i += 2) {
    const rowMembers = members.slice(i, i + 2);
    const rowHtml = `
      <div class="row">
        ${rowMembers
          .map(
            (member) => `
              <div class="card">
                <p class="mb-1">To,</p>
                <p class="name">${member.personalDetails.name}</p>
                <p class="address">${member.presentAddress.flatNumberName},</p>
                <p class="address">
                  ${member.presentAddress.addressLine1}, ${member.presentAddress.addressLine2}
                </p>
                <p class="address">
                  ${member.presentAddress.city}, ${member.presentAddress.state} - ${member.presentAddress.pincode}
                </p>
                <p class="address phone">Phone: +91 - ${member.personalDetails.mobileNumber}</p>
              </div>
            `
          )
          .join('')}
      </div>
    `;
    groupedRows.push(rowHtml);
  }

  return `
    <html>
      <head>
        <style>
          @media print {
            @page {
              margin: 0.5in;
            }
            body {
              font-family: sans-serif;
              margin: 0;
              padding: 0;
              background: #ffffff;
            }
            .row {
              display: flex;
              gap: 20px;
              margin-bottom: 20px;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .card {
              flex: 1;
              max-width: 49%;
              background: white;
              border: 1px solid black;
              padding: 12px;
              box-sizing: border-box;
              page-break-inside: avoid;
              break-inside: avoid;
            }
            .mb-1 {
              margin: 0;
              padding: 0;
              font-size: 0.875rem;
            }
            .name {
              font-size: 1rem;
              font-weight: Bold;
              margin-bottom: 1px;
            }
            .address {
              font-size: 0.875rem;
              line-height: 1.5;
              margin: 2px 0;
            }

            .phone {
              font-weight: strong;
            }
          }
        </style>
      </head>
      <body>
        ${groupedRows.join('')}
      </body>
    </html>
  `;
}

app.get("/generate-pdf", async (req, res) => {
  try {
    // const {url} = req.query;

    // if (!url) {
    //   return res.status(400).send("URL is required");
    // }
    const snapshot = await db.ref("/kalakairali/members").once("value");
    const records = snapshot.val();
    if (!records) {
      return res.status(404).send("No records found");
    }
    const members = Object.entries(records || {}).map(([key, value]: [string, any]) => ({
      memberId: value.memberId,
      isInactive: value.isInactive,
      verified: value.verified,
      personalDetails: {
        name: value.personalDetails?.name ?? '',
        mobileNumber: value.personalDetails?.mobileNumber ?? ''
      },
      presentAddress: {
        flatNumberName: value.presentAddress?.flatNumberName ?? '',
        addressLine1: value.presentAddress?.addressLine1 ?? '',
        addressLine2: value.presentAddress?.addressLine2 ?? '',
        city: value.presentAddress?.city ?? '',
        state: value.presentAddress?.state ?? '',
        pincode: value.presentAddress?.pincode ?? ''
      }
    }));

    const activeMembers = members.filter((member)=> !member.isInactive && member.verified)
                              .sort((a, b)=> a.personalDetails.name.localeCompare(b.personalDetails.name))
    const html = generateHTML(activeMembers);

    const browser = await puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    await page.setContent(html, {waitUntil: "networkidle0"});

    const pdfBuffer = await page.pdf({
      format: "a4",
      printBackground: false,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
    });

    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="records.pdf"',
      "Content-Length": pdfBuffer.length,
    });
    return res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating PDF:", error);
    return res.status(500).send("Error generating PDF");
  }
});

export const api = onRequest(app);
import React, { useState } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "134777203673-a1ngnpv4l8kavvtm4q8v0rnvg89r6131.apps.googleusercontent.com";
const FOLDER_ID = "1-eneDr3eUAEs1gIb45Ugq2-pUCpbOAQM";
const SCOPES = "https://www.googleapis.com/auth/drive.file";

const GoogleDriveUploader: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  // Initialize Google API client
  const initClient = () => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          scope: SCOPES,
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();
          setIsAuthenticated(authInstance.isSignedIn.get());
          authInstance.isSignedIn.listen(setIsAuthenticated);
        })
        .catch((error: any) =>
          console.error("Error initializing Google API client", error)
        );
    });
  };

  // Handle Sign-In
  const handleSignIn = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  // Handle Sign-Out
  const handleSignOut = () => {
    gapi.auth2.getAuthInstance().signOut();
  };

  // Upload Image to Google Drive
  const uploadToDrive = async (
    base64Data: string,
    fileName: string,
    folderId: string
  ) => {
    try {
      const boundary = "-------314159265358979323846";
      const contentType = "image/png"; // Change based on your file type
      const metadata = {
        name: fileName,
        mimeType: contentType,
        parents: [folderId], // Specify the folder ID here
      };

      const multipartRequestBody =
        `\r\n--${boundary}\r\n` +
        "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
        JSON.stringify(metadata) +
        `\r\n--${boundary}\r\n` +
        `Content-Type: ${contentType}\r\n\r\n` +
        atob(base64Data.split(",")[1]) +
        `\r\n--${boundary}--`;

      const response = await gapi.client.request({
        path: "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        method: "POST",
        headers: {
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      });

      const fileId = response.result.id;

      // Make the file publicly accessible
      await gapi.client.request({
        path: `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
        method: "POST",
        body: {
          role: "reader",
          type: "anyone",
        },
      });

      // Get the public URL
      const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
      setFileUrl(fileUrl);

      return fileUrl;
    } catch (error) {
      console.error("Error uploading to Google Drive:", error);
    }
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Data = e.target?.result as string;
      const fileName = file.name;
      await uploadToDrive(base64Data, fileName, FOLDER_ID);
    };
    reader.readAsDataURL(file);
  };

  React.useEffect(() => {
    initClient();
  }, []);

  return (
    <div>
      <h1>Google Drive Image Uploader</h1>
      {isAuthenticated ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
      <input type="file" accept="image/*" onChange={handleFileUpload} />
      {fileUrl && (
        <div>
          <p>Uploaded File:</p>
          <img
            src={fileUrl}
            alt="Uploaded to Google Drive"
            style={{ maxWidth: "300px" }}
          />
          <p>
            Public URL:{" "}
            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
              {fileUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default GoogleDriveUploader;

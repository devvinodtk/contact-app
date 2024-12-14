import React, { useEffect, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { Save } from "lucide-react";
import { gapi } from "gapi-script";

export type ProfilePicEditorProps = {
  imageSrc: string;
};

const ProfilePicEditor: React.FC<ProfilePicEditorProps> = ({
  imageSrc,
}: ProfilePicEditorProps) => {
  // Provide the google drive client_id here
  const YOUR_CLIENT_ID = "";

  const editorRef = useRef<AvatarEditor>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const accessTokenRef = useRef("");

  const handleSave = async () => {
    const canvas = editorRef.current.getImage();
    const image = canvas.toDataURL(); // Get base64 of the cropped image
    await uploadToGoogleDrive(
      image,
      "profile_pic_" + new Date().getTime() + ".png",
      "1-eneDr3eUAEs1gIb45Ugq2-pUCpbOAQM"
    );
  };

  const onSignInChange = () => {
    const authInstance = gapi.auth2.getAuthInstance();
    if (authInstance.isSignedIn.get()) {
      const user = authInstance.currentUser.get();
      const token = user.getAuthResponse().access_token;
      accessTokenRef.current = token;
      scheduleTokenRefresh(user);
    }
  };

  const scheduleTokenRefresh = (user: any) => {
    const expiresIn = user.getAuthResponse().expires_in * 1000;
    setTimeout(() => {
      user.reloadAuthResponse().then((authResponse: any) => {
        console.log("Access Token refreshed:", authResponse.access_token);
        accessTokenRef.current = authResponse.access_token;
        scheduleTokenRefresh(user); // Schedule next refresh
      });
    }, expiresIn - 60000);
  };

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          clientId: YOUR_CLIENT_ID,
          scope: "https://www.googleapis.com/auth/drive.file",
        })
        .then(() => {
          const authInstance = gapi.auth2.getAuthInstance();

          if (authInstance.isSignedIn.get()) {
            const user = authInstance.currentUser.get();
            const token = user.getAuthResponse().access_token;
            accessTokenRef.current = token;
          }

          authInstance.isSignedIn.listen(onSignInChange);
        });
    };

    gapi.load("client:auth2", initClient);
  }, []);

  async function uploadToGoogleDrive(
    base64: string,
    fileName: string,
    folderId: string
  ) {
    const boundary = "-------314159265358979323856";
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;
    const mimeType = base64.split(",")[0].split(":")[1].split(";")[0];

    // Metadata
    const metadata = {
      name: fileName,
      mimeType: mimeType,
      parents: [folderId],
    };

    const multipartRequestBody =
      delimiter +
      "Content-Type: application/json\r\n\r\n" +
      JSON.stringify(metadata) +
      "\r\n" +
      delimiter +
      "Content-Type: " +
      mimeType +
      "\r\n" +
      "Content-Transfer-Encoding: base64\r\n\r\n" +
      base64.split(",")[1] +
      closeDelimiter;

    // Send request
    const response = await fetch(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessTokenRef.current}`,
          "Content-Type": `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    const result = await response.json();

    if (response.ok) {
      //return result.id; // Return file ID or URL
      const fileId = result.id;

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

      // const fileUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      // setFileUrl(fileUrl);

      fetchFile(fileId);
    } else {
      console.error("Error uploading file:", result);
    }
  }

  async function fetchFile(fileId: string) {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessTokenRef.current}`,
      },
    });

    if (response.ok) {
      const blob = await response.blob();
      const imageBlobUrl = URL.createObjectURL(blob);
      setFileUrl(imageBlobUrl);
    } else {
      console.error(
        "Failed to fetch file:",
        response.status,
        response.statusText
      );
    }
  }

  return (
    <div className="flex flex-row">
      {fileUrl && <img src={fileUrl} alt="Converted Image" />}
      {!fileUrl && (
        <div>
          <AvatarEditor
            className="rounded-full border-4 border-white shadow-md"
            ref={editorRef}
            image={imageSrc} // or file input
          />
        </div>
      )}
      <div className="bg-blue-500 text-white ml-2 px-4 py-2 rounded">
        <div>
          <Save className="cursor-pointer" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicEditor;

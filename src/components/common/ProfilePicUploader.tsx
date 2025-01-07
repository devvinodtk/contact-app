import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ProfilePicEditor from "./ProfilePicEditor";
import { Crop, Upload, Save } from "lucide-react";
import { Button } from "@material-tailwind/react";
import { storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { toastOptions } from "../../types/Users";

interface ProfilePicUploaderProps {
  profilePicUrl?: string;
  onSaveImageSuccess: (imageUrl: string) => void;
}

const ProfilePicUploader: React.FC<ProfilePicUploaderProps> = ({
  profilePicUrl,
  onSaveImageSuccess,
}) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const imageRef = useRef<ReactCropperElement>(null);
  const [imageStrting, setImageString] = useState<string | null>(null);

  const onDrop = (acceptedFiles: any) => {
    setCroppedImage(null);
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => setImage(reader.result as any);
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleCrop = () => {
    if (typeof imageRef.current?.cropper !== undefined) {
      setCroppedImage(imageRef.current?.cropper.getCroppedCanvas().toDataURL());
    }
  };

  const handleImageChange: (image: string) => void = (image) => {
    setImageString(image);
  };

  const resizeImage = (base64: string): Promise<Blob | null> =>
    new Promise((resolve, reject) => {
      const maxWidth = 1024;
      const maxHeight = 1024;
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            width = maxWidth;
            height = Math.floor((img.height / img.width) * maxWidth);
          } else {
            height = maxHeight;
            width = Math.floor((img.width / img.height) * maxHeight);
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Draw the resized image
        ctx?.drawImage(img, 0, 0, width, height);

        // Convert to Blob
        canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg", // You can change the format (e.g., image/png)
          0.8 // Quality (0.1 to 1.0)
        );
      };

      img.onerror = reject;

      img.src = base64;
    });

  const handleSave = async () => {
    if (!imageStrting) return;
    try {
      const imgRef = ref(storage, `images/profile/${uuidv4()}`);
      const blob = await resizeImage(imageStrting);
      if (blob) {
        await uploadBytes(imgRef, blob);
        const downloadUrl = await getDownloadURL(imgRef);
        if (downloadUrl) {
          toast.success("Profile picture uploaded successfully", toastOptions);
          onSaveImageSuccess(downloadUrl);
        }
      }
    } catch (err: any) {
      toast.error(
        "Failed to uploaded profile picture: " + err.message,
        toastOptions
      );
    }
  };

  return (
    <div className="w-full">
      {profilePicUrl && !image && (
        <img
          src={profilePicUrl}
          alt="Profile pic for member"
          className="h-[150px] w-[150px] mb-2 mx-auto rounded-full border-4 border-white shadow-md"
        />
      )}
      {!croppedImage && image && (
        <Cropper
          height={150}
          width={150}
          src={image}
          ref={imageRef}
          initialAspectRatio={1}
          aspectRatio={1}
          guides={false}
          scalable={true}
          background={false}
          responsive={true}
          checkOrientation={true}
          className="flex justify-center"
        />
      )}
      {!profilePicUrl && !croppedImage && !image && (
        <img
          src="https://placehold.co/400x400?text=Upload Your\nPhoto"
          alt="Profile"
          className="h-[150px] w-[150px] mb-2 mx-auto rounded-full border-4 border-white shadow-md"
        />
      )}
      {croppedImage && (
        <ProfilePicEditor
          onHandleSave={handleImageChange}
          imageSrc={croppedImage}
        />
      )}
      <div className="flex justify-center mx-auto w-full">
        <Button
          {...({} as React.ComponentProps<typeof Button>)}
          color="blue"
          className="cursor-pointer mr-3 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-xs px-2 py-1 text-center"
        >
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Upload className="cursor-pointer" />
          </div>
        </Button>
        <Button
          disabled={!image}
          color="blue"
          {...({} as React.ComponentProps<typeof Button>)}
          className="cursor-pointer mr-3 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-xs px-2 py-1 text-center"
        >
          <div>
            <Crop
              className={image ? "cursor-pointer " : ""}
              onClick={handleCrop}
            />
          </div>
        </Button>
        <Button
          disabled={!image || !croppedImage}
          color="blue"
          {...({} as React.ComponentProps<typeof Button>)}
          className="cursor-pointer text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-xs px-2 py-1 text-center"
        >
          <div>
            <Save className="cursor-pointer" onClick={handleSave} />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicUploader;

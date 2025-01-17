import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ProfilePicEditor from "./ProfilePicEditor";
import { Crop, Upload } from "lucide-react";
import { Button, Typography } from "@material-tailwind/react";
import { typographyProps } from "../../types/Users";

interface ProfilePicUploaderProps {
  profilePicUrl?: string;
  onCropProfilePic: (imageStr: string) => void;
}

const ProfilePicUploader: React.FC<ProfilePicUploaderProps> = ({
  profilePicUrl,
  onCropProfilePic,
}) => {
  const [image, setImage] = useState(null);
  const [croppedImage, setCroppedImage] = useState<any>(null);
  const imageRef = useRef<ReactCropperElement>(null);

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
    onCropProfilePic(image);
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
        <>
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
          <Typography
            className="text-red-600 text-center mb-2 mx-2"
            {...(typographyProps as React.ComponentProps<typeof Typography>)}
          >
            Please select the desired area and crop the image using crop (
            <Crop className="inline h-4"></Crop>) button.
          </Typography>
        </>
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
          className="cursor-pointertext-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-xs px-2 py-1 text-center"
        >
          <div>
            <Crop
              className={image ? "cursor-pointer " : ""}
              onClick={handleCrop}
            />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default ProfilePicUploader;

import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ProfilePicEditor from "./ProfilePicEditor";
import { Crop, Upload } from "lucide-react";

const ProfilePicUploader: React.FC = () => {
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

  return (
    <div>
      {!croppedImage && image && (
        <Cropper
          src={image}
          ref={imageRef}
          style={{ height: 100, width: 100 }}
          zoomTo={0.5}
          initialAspectRatio={1}
          aspectRatio={1}
          guides={false}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          checkOrientation={false}
          autoCropArea={1}
          frameBorder={"20px"}
        />
      )}
      {!croppedImage && !image && (
        <img
          src="src/assets/place_holder_100.png"
          alt="Profile"
          className="w-100 h-100 rounded-full border-4 border-white shadow-md"
        />
      )}
      {croppedImage && <ProfilePicEditor imageSrc={croppedImage} />}
      <div className="flex flex-row content-center">
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <Upload className="cursor-pointer" />
        </div>
        <Crop className={image ? "cursor-pointer" : ""} onClick={handleCrop} />
      </div>
    </div>
  );
};

export default ProfilePicUploader;

import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ProfilePicEditor from "./ProfilePicEditor";

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
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="w-full p-2 border rounded mb-4 text-gray-600">
          Drag & drop a file here, or click to select one
        </p>
      </div>
      {croppedImage && <ProfilePicEditor imageSrc={croppedImage} />}
      {!croppedImage && image && (
        <Cropper
          src={image}
          ref={imageRef}
          style={{ height: 200, width: 200 }}
          zoomTo={0.5}
          initialAspectRatio={1}
          aspectRatio={1}
          guides={false}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          max={100}
          background={false}
          responsive={true}
          checkOrientation={false}
          autoCropArea={1}
          frameBorder={"20px"}
        />
      )}
      <button
        className="w-full p-2 border rounded mb-4 text-gray-600"
        onClick={handleCrop}
      >
        Crop
      </button>
    </div>
  );
};

export default ProfilePicUploader;

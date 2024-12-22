import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import ProfilePicEditor from "./ProfilePicEditor";
import { Crop, Upload, Save } from "lucide-react";

const ProfilePicUploader: React.FC = () => {
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

  const handleSave = () => {
    console.log("Image saved", imageStrting);
  };

  return (
    <div className="w-full">
      {!croppedImage && image && (
        <Cropper
          src={image}
          ref={imageRef}
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
        <div className="bg-blue-500 text-white px-4 py-2 rounded">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Upload className="cursor-pointer" />
          </div>
        </div>
        <div className="bg-blue-500 text-white ml-2 px-4 py-2 rounded">
          <div>
            <Crop
              className={image ? "cursor-pointer " : ""}
              onClick={handleCrop}
            />
          </div>
        </div>
        <div className="bg-blue-500 text-white ml-2 px-4 py-2 rounded">
          <div>
            <Save className="cursor-pointer" onClick={handleSave} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePicUploader;

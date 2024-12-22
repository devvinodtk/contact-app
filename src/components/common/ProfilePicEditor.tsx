import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";

export type ProfilePicEditorProps = {
  imageSrc: string;
  onHandleSave?: (image: string) => void;
};

const ProfilePicEditor: React.FC<ProfilePicEditorProps> = ({
  imageSrc,
  onHandleSave,
}: ProfilePicEditorProps) => {
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const image = canvas.toDataURL(); // Get base64 of the cropped image
      onHandleSave && onHandleSave(image);
    }
  };

  return (
    <div className="flex flex-row">
      <AvatarEditor
        onImageReady={() => handleSave()}
        className="rounded-full border-4 border-white shadow-md"
        ref={editorRef}
        image={imageSrc} // or file input
      />
    </div>
  );
};

export default ProfilePicEditor;

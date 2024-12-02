import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
export type ProfilePicEditorProps = {
  imageSrc: string;
};

const ProfilePicEditor: React.FC<ProfilePicEditorProps> = ({
  imageSrc,
}: ProfilePicEditorProps) => {
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = () => {
    const canvas = editorRef.current.getImage();
    const image = canvas.toDataURL(); // Get base64 of the cropped image
    console.log(image);
  };

  return (
    <div>
      <AvatarEditor
        ref={editorRef}
        image={imageSrc} // or file input
        width={200}
        height={200}
        border={5}
        scale={1.2}
      />
      <button
        className="w-full p-2 border rounded mb-4 text-gray-600"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default ProfilePicEditor;

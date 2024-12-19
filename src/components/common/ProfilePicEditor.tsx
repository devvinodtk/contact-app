import React, { useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import { Save } from "lucide-react";

export type ProfilePicEditorProps = {
  imageSrc: string;
};

const ProfilePicEditor: React.FC<ProfilePicEditorProps> = ({
  imageSrc,
}: ProfilePicEditorProps) => {
  const editorRef = useRef<AvatarEditor>(null);

  const handleSave = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImage();
      const image = canvas.toDataURL(); // Get base64 of the cropped image
      console.log(image);
    }
  };

  return (
    <div className="flex flex-row">
      <AvatarEditor
        className="rounded-full border-4 border-white shadow-md"
        ref={editorRef}
        image={imageSrc} // or file input
      />
      <div className="bg-blue-500 text-white ml-2 px-4 py-2 rounded">
        <div>
          <Save className="cursor-pointer" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePicEditor;

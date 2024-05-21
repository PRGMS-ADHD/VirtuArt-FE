import React from 'react';

interface ProfileTextAreaProps {
  text?: string;
  onChange: (text: string) => void;
}

const ProfileTextArea: React.FC<ProfileTextAreaProps> = ({
  text,
  onChange,
}) => {
  return (
    <textarea
      className="h-32 w-[56rem] resize-none rounded border border-gray-300 bg-white p-4 shadow-md"
      value={text}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ProfileTextArea;

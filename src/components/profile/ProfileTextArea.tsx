interface ProfileTextAreaProps {
  text?: string;
}

const ProfileTextArea: React.FC<ProfileTextAreaProps> = ({ text }) => {
  return (
    <textarea
      value={text || ''}
      readOnly={!!text}
      className="h-[125px] w-[56rem] resize-none rounded border border-gray-300 bg-white p-4 shadow-md"
    />
  );
};

export default ProfileTextArea;

import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';

interface SettingsButtonProps {
  onClick?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="flex h-8 w-24 items-center justify-center bg-black text-white shadow-md"
      onClick={onClick}
    >
      <Cog6ToothIcon className="mr-1 h-5 w-5" />
      <span className="font-['Helvetica'] text-xs font-normal">SETTINGS</span>
    </button>
  );
};

export default SettingsButton;

// import React from 'react';
// import { Cog6ToothIcon } from '@heroicons/react/20/solid';
//
// interface SettingsButtonProps {
//   onClick?: () => void;
// }
//
// const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
//   return (
//     <button
//       type="button"
//       className="relative flex h-[30px] w-[100px] items-center justify-center shadow-md"
//       onClick={onClick}
//     >
//       <div className="absolute left-0 top-0 h-[30px] w-[100px] bg-black" />
//       <Cog6ToothIcon className="z-10 h-4 w-4 text-white" />
//       <div className="z-10 ml-1 font-['Helvetica'] text-xs font-normal text-white">
//         SETTINGS
//       </div>
//     </button>
//   );
// };
//
// export default SettingsButton;
import React from 'react';
import { Cog6ToothIcon } from '@heroicons/react/20/solid';

interface SettingsButtonProps {
  onClick?: () => void;
}

const SettingsButton: React.FC<SettingsButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="flex h-[30px] w-[100px] items-center justify-center bg-black text-white shadow-md"
      onClick={onClick}
    >
      <Cog6ToothIcon className="mr-1 h-5 w-5" />
      <span className="font-['Helvetica'] text-xs font-normal">SETTINGS</span>
    </button>
  );
};

export default SettingsButton;

import IconLink from '../common/IconLink';

function ProfileLinks() {
  return (
    <div className="ml-36 mt-5 flex items-baseline justify-between custom:mb-4 custom:ml-14">
      <IconLink
        type="location"
        text="서울, 대한민국"
        to="/"
        iconSize="w-4 h-4"
      />
      <div className="mb-2 mr-4 flex space-x-4 custom:mr-2">
        <IconLink
          type="contact"
          text="vanheeho@gmail.com"
          to="/"
          iconSize="w-4 h-4"
        />
        <IconLink
          type="instagram"
          text="@vanheeho"
          to="https://instagram.com"
          iconSize="w-4 h-4"
        />
      </div>
    </div>
  );
}

export default ProfileLinks;
//
// import React, { useState } from 'react';
// import IconLink from '../common/IconLink';
//
// function ProfileLinks({ isEditing }) {
//   const [location, setLocation] = useState('서울, 대한민국');
//   const [contact, setContact] = useState('vanheeho@gmail.com');
//   const [instagram, setInstagram] = useState('@vanheeho');
//
//   return (
//     <div className="mb-4 ml-12 mt-4 flex items-center justify-between">
//       <div className="flex items-center">
//         <IconLink type="location" to="/" iconSize="w-4 h-4" />
//         {isEditing ? (
//           <input
//             className=" font-noto-sans-kr text-[12px] font-light text-customGray3"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />
//         ) : (
//           <span className=" font-noto-sans-kr text-[12px] font-light text-customGray3">
//             {location}
//           </span>
//         )}
//       </div>
//       <div className=" flex flex-row space-x-4">
//         <div className="flex items-center">
//           <IconLink type="contact" to="/" iconSize="w-4 h-4" />
//           {isEditing ? (
//             <input
//               className="font-noto-sans-kr text-[12px] font-light text-customGray3 -mr-[8.5px]"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//           ) : (
//             <span className="font-noto-sans-kr text-[12px] font-light text-customGray3">
//               {contact}
//             </span>
//           )}
//         </div>
//         <div className="flex items-center">
//           <IconLink
//             type="instagram"
//             to="https://instagram.com"
//             iconSize="w-4 h-4"
//           />
//           {isEditing ? (
//             <input
//               className="font-noto-sans-kr text-[12px] font-light text-customGray3 -mr-[58px]"
//               value={instagram}
//               onChange={(e) => setInstagram(e.target.value)}
//             />
//           ) : (
//             <span className="font-noto-sans-kr text-[12px] font-light text-customGray3">
//               {instagram}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default ProfileLinks;

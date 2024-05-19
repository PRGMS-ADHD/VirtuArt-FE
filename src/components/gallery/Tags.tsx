// import { useState } from 'react';
// import { Tags as TagData } from '../../data/Tags';
//
// interface Tag {
//   id: number;
//   name: string;
// }
//
// const Tags = () => {
//   const [tagSelect, setTagSelect] = useState<Record<number, boolean>>({});
//
//   const handleSelect = (tagId: number) => {
//     setTagSelect((prevState) => ({
//       ...prevState,
//       [tagId]: !prevState[tagId],
//     }));
//   };
//
//   return (
//     <div className="flex w-full justify-center bg-gray-100 p-4">
//       <div className="grid grid-cols-8 gap-2 text-center">
//         {TagData.map((tag: Tag) => (
//           <span
//             key={tag.id}
//             className={`mr-2 rounded-2xl border  p-1 py-2 text-[11px] shadow-md ${
//               tagSelect[tag.id]
//                 ? 'bg-black text-white'
//                 : 'border-black bg-white text-black'
//             }`}
//             onClick={() => handleSelect(tag.id)}
//           >
//             #{tag.name}
//           </span>
//         ))}
//       </div>
//     </div>
//   );
// };
//
// export default Tags;
import { useState, KeyboardEvent } from 'react';
import { Tags as TagData } from '../../data/Tags';

const Tags = () => {
  const [tagSelect, setTagSelect] = useState<Record<number, boolean>>({});

  const handleSelect = (tagId: number) => {
    setTagSelect((prevState) => ({
      ...prevState,
      [tagId]: !prevState[tagId],
    }));
  };

  const handleKeyDown = (event: KeyboardEvent, tagId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleSelect(tagId);
    }
  };

  return (
    <div className="flex w-full justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-8 gap-2 text-center">
        {TagData.map((tag) => (
          <span
            key={tag.id}
            role="button"
            tabIndex={0}
            className={`rounded-2xl border p-1 py-2 text-[11px] shadow-md ${
              tagSelect[tag.id]
                ? 'bg-black text-white'
                : 'border-black bg-white text-black'
            }`}
            onClick={() => handleSelect(tag.id)}
            onKeyDown={(event) => handleKeyDown(event, tag.id)}
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;

import { Tags as TagData } from '../../data/Tags';

const Tags = () => {
  return (
    <div className="my-5 flex w-full justify-center bg-gray-100 p-4">
      <div className="grid grid-cols-8 gap-2 text-center">
        {TagData.map((tag) => (
          <span
            key={tag.id}
            className="mr-2 rounded-xl border border-black p-1 py-1 text-[10px] text-black"
          >
            #{tag.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Tags;

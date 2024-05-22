import React, { useEffect, useState } from 'react';
import { User } from '@/models/user.model';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { fetchArtistLikers } from '../../api/likes.api';
import errorPersonImg from '../../../public/errorImage/profile-circle.svg';

const CollectorCard: React.FC<{ collector: User }> = ({ collector }) => (
  <div className="flex flex-col items-center">
    <img
      src={collector.profile_image}
      alt={collector.username}
      className="w-30 h-30 mb-2 rounded-full object-cover"
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = errorPersonImg;
      }}
    />
    <div className="font-notoSansKR max-w-32 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm text-gray-600">
      {collector.username}
    </div>
  </div>
);

const Collectors: React.FC<{ artistId: string }> = ({ artistId }) => {
  const [visibleItems, setVisibleItems] = useState(18);
  const [collectors, setCollectors] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(18);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchCollectors = async () => {
      const likers = await fetchArtistLikers(artistId);
      setCollectors(likers);
    };

    fetchCollectors();
  }, [artistId]);

  const handleLoadMore = () => {
    if (!isExpanded) {
      const newVisibleItems = visibleItems + 18;
      setVisibleItems(newVisibleItems);
      setIsExpanded(newVisibleItems > collectors.length);
    } else {
      setVisibleItems(18);
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div className="my-10 flex flex-col items-center">
      <div className="w-[85%] border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-2 ml-1 flex font-helveticaNeue text-xl">
            COLLECTORS
          </p>
          {collectors.length > 0 ? (
            <div className="ml-2 grid grid-cols-2 gap-11 transition-all duration-700 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9">
              {collectors.slice(0, visibleItems).map((collector: User) => (
                <CollectorCard key={collector._id} collector={collector} />
              ))}
            </div>
          ) : (
            <p className="ml-1">No collectors yet</p>
          )}
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default Collectors;

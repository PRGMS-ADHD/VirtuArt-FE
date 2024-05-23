import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadMoreButton from '@/components/common/LoadMoreButton';
import { ArtistModel } from '@/models/artist.model';
import { fetchArtWorksByArtist } from '@/api/images.api';
import { ArtworkModel } from '@/models/artwork.model';
import ImageTooltip from '@/components/gallery/ImageTooltip';
import LikesButton from '@/components/image/LikesButton';
import { useAuthStore } from '@/store/authStore';
import { fetchUserLikedArtworks, apiToggleLike } from '@/api/likes.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface FetchAndDisplayGridProps {
  errorImage: string;
  artist: ArtistModel | null;
  artworkId?: string;
}

interface OtherArtWorkItemProps {
  artwork: ArtworkModel;
  errorImage: string;
  handleArtistClick: (artWorkId: string) => void;
  handleMouseEnter: (id: string) => void;
  handleMouseLeave: () => void;
  showTooltip: boolean;
  hoveredImageId: string | null;
  handleLikeStatusChange: (artworkId: string) => void;
}

const OtherArtWorkItem: React.FC<OtherArtWorkItemProps> = ({
  artwork,
  errorImage,
  handleArtistClick,
  handleMouseEnter,
  handleMouseLeave,
  showTooltip,
  hoveredImageId,
  handleLikeStatusChange,
}) => {
  const token = useAuthStore((state) => state.token);

  return (
    <div
      key={artwork._id}
      className="relative"
      onClick={() => handleArtistClick(artwork._id)}
      onMouseEnter={() => handleMouseEnter(artwork._id)}
      onMouseLeave={handleMouseLeave}
    >
      {artwork.image ? (
        <img
          src={artwork.image}
          className="h-[200px] w-full object-cover transition-all duration-700 sm:h-[15rem] sm:w-[25rem]"
        />
      ) : (
        <img
          src={errorImage}
          alt="errorImage"
          className="h-[200px] w-[350px] object-cover"
        />
      )}
      <div className="absolute right-0 top-0 p-2">
        <LikesButton
          initialLiked={artwork.isLiked || false}
          onLikeStatusChange={() => handleLikeStatusChange(artwork._id)} // 이벤트 핸들러 연결
          targetId={artwork._id}
          targetType="artwork"
          token={token}
        />
      </div>
      {showTooltip && hoveredImageId === artwork._id && (
        <ImageTooltip title={artwork.name} artist={artwork.artist} />
      )}
    </div>
  );
};

// const OtherWorks: React.FC<FetchAndDisplayGridProps> = ({
//   errorImage,
//   artist,
// }) => {
//   const [artworks, setArtWorks] = useState<ArtworkModel[]>([]);
//   const [visibleItems, setVisibleItems] = useState(8);
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
//   const [showTooltip, setShowTooltip] = useState(false);
//   const { token } = useAuthStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAndSetArtworks = async () => {
//       try {
//         if (artist && artist._id) {
//           const artistArtworks = await fetchArtWorksByArtist(artist._id);
//           const likedArtworks = await fetchUserLikedArtworks(token);

//           const updatedArtworks = artistArtworks.map((artwork) => ({
//             ...artwork,
//             isLiked: likedArtworks.some(
//               (likedArtwork) => likedArtwork._id === artwork._id,
//             ),
//           }));

//           setArtWorks(updatedArtworks);
//         }
//       } catch (error) {
//         console.error('Failed to fetch artworks:', error);
//       }
//     };

//     if (artist && artist._id && token) {
//       fetchAndSetArtworks();
//     }
//   }, [artist, token]);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setVisibleItems(4);
//       } else {
//         setVisibleItems(8);
//       }
//     };
//     handleResize();
//     window.addEventListener('resize', handleResize);

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const handleLikeStatusChange = async (artworkId: string) => {
//     const artworkIndex = artworks.findIndex((art) => art._id === artworkId);
//     if (artworkIndex !== -1) {
//       const newArtworks = [...artworks];
//       newArtworks[artworkIndex].isLiked = !newArtworks[artworkIndex].isLiked;
//       setArtWorks(newArtworks); // Optimistically update the UI

//       try {
//         await apiToggleLike(token, 'artwork', artworkId);
//       } catch (error) {
//         console.error('Failed to toggle like status:', error);
//         newArtworks[artworkIndex].isLiked = !newArtworks[artworkIndex].isLiked;
//         setArtWorks(newArtworks);
//       }
//     }
//   };

//   const handleLoadMore = () => {
//     if (!isExpanded) {
//       const newVisibleItems = visibleItems + 8;
//       setVisibleItems(newVisibleItems);
//       setIsExpanded(newVisibleItems >= artworks.length);
//     } else {
//       setVisibleItems(8);
//       setIsExpanded(false);
//     }
//   };

//   const handleArtistClick = (artWorkId: string) => {
//     navigate(`/artworks/${artWorkId}`);
//     window.scrollTo(0, 0);
//   };

//   const handleMouseEnter = (id: string) => {
//     setShowTooltip(true);
//     setHoveredImageId(id);
//   };

//   const handleMouseLeave = () => {
//     setShowTooltip(false);
//   };

//   return (
//     <div className="my-6 flex items-center justify-center px-8">
//       <div className="w-[88%] border-b border-customGray6">
//         <div className="pt-8">
//           <p className="mb-1 ml-1 font-helveticaNeue text-xl">OTHER WORKS</p>
//           <div className="grid min-h-[200px] cursor-pointer grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
//             {artworks.slice(0, visibleItems).map((artwork) => (
//               <OtherArtWorkItem
//                 key={artwork._id}
//                 artwork={artwork}
//                 errorImage={errorImage}
//                 handleArtistClick={handleArtistClick}
//                 handleMouseEnter={handleMouseEnter}
//                 handleMouseLeave={handleMouseLeave}
//                 showTooltip={showTooltip}
//                 hoveredImageId={hoveredImageId}
//                 handleLikeStatusChange={handleLikeStatusChange}
//               />
//             ))}
//           </div>
//         </div>
//         <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
//       </div>
//     </div>
//   );
// };

// export default OtherWorks;

const OtherWorks: React.FC<FetchAndDisplayGridProps> = ({
  errorImage,
  artist,
  artworkId,
}) => {
  const [visibleItems, setVisibleItems] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredImageId, setHoveredImageId] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: artworks,
    isLoading: isLoadingArtworks,
    error: errorArtworks,
  } = useQuery({
    queryKey: ['artworks', artist?._id],
    queryFn: () => fetchArtWorksByArtist(artist?._id),
    enabled: !!artist?._id,
  });

  const { data: likedArtworks, isLoading: isLoadingLikedArtworks } = useQuery({
    queryKey: ['likedArtworks', token],
    queryFn: () => fetchUserLikedArtworks(token),
    enabled: !!token,
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (artworkId: string) =>
      apiToggleLike(token, 'artwork', artworkId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artworks', artist?._id] });
      queryClient.invalidateQueries({ queryKey: ['likedArtworks', token] });
    },
  });

  const handleLikeStatusChange = (artworkId: string) => {
    toggleLikeMutation.mutate(artworkId);
  };

  const handleLoadMore = () => {
    const newVisibleItems = visibleItems + 8;
    setVisibleItems(newVisibleItems);
    setIsExpanded(newVisibleItems >= artworks?.length);
  };

  const handleArtistClick = (artWorkId: string) => {
    navigate(`/artworks/${artWorkId}`);
    window.scrollTo(0, 0);
  };

  const handleMouseEnter = (id: string) => {
    setShowTooltip(true);
    setHoveredImageId(id);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
    setHoveredImageId(null);
  };

  if (errorArtworks) {
    return <div>Error loading artworks.</div>;
  }

  const artworksWithLikeStatus =
    artworks
      ?.map((artwork: ArtworkModel) => ({
        ...artwork,
        isLiked: likedArtworks?.some(
          (likedArtwork) => likedArtwork._id === artwork._id,
        ),
      }))
      .filter((artwork: ArtworkModel) => artwork._id !== artworkId) || [];

  return (
    <div className="my-6 flex items-center justify-center px-8">
      <div className="w-[88%] border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">OTHER WORKS</p>
          {isLoadingArtworks || isLoadingLikedArtworks ? (
            <div className="flex h-[200px] items-center justify-center">
              Loading...
            </div>
          ) : (
            <div className="grid min-h-[200px] cursor-pointer grid-cols-1 gap-8 transition-all duration-700 sm:grid-cols-2 custom:grid-cols-4">
              {artworksWithLikeStatus
                .slice(0, visibleItems)
                .map((artwork: ArtworkModel) => (
                  <OtherArtWorkItem
                    key={artwork._id}
                    artwork={artwork}
                    errorImage={errorImage}
                    handleArtistClick={handleArtistClick}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseLeave={handleMouseLeave}
                    showTooltip={showTooltip}
                    hoveredImageId={hoveredImageId}
                    handleLikeStatusChange={handleLikeStatusChange}
                  />
                ))}
            </div>
          )}
        </div>
        <LoadMoreButton onClick={handleLoadMore} isExpanded={isExpanded} />
      </div>
    </div>
  );
};

export default OtherWorks;

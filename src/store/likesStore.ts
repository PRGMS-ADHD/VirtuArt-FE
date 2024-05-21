import create from 'zustand';

type State = {
  likedArtworks: string[];
  addLikedArtwork: (id: string) => void;
  removeLikedArtwork: (id: string) => void;
};

export const useLikesStore = create<State>((set) => ({
  likedArtworks: [],
  addLikedArtwork: (id) =>
    set((state) => ({ likedArtworks: [...state.likedArtworks, id] })),
  removeLikedArtwork: (id) =>
    set((state) => ({
      likedArtworks: state.likedArtworks.filter(
        (artworkId) => artworkId !== id,
      ),
    })),
}));

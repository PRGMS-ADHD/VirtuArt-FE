import { ArtPiece, ArtPieces } from './artPieces';

interface UserArtPieceLike {
  id: number;
  artPieceId: number;
  userId: number;
  imageUrl: string;
}

const UserArtPieceLikes: UserArtPieceLike[] = [
  {
    id: 1,
    artPieceId: 1,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 1)?.imageUrl || '',
  },
  {
    id: 2,
    artPieceId: 2,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 2)?.imageUrl || '',
  },
  {
    id: 3,
    artPieceId: 3,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 3)?.imageUrl || '',
  },
  {
    id: 4,
    artPieceId: 4,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 4)?.imageUrl || '',
  },
  {
    id: 5,
    artPieceId: 5,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 5)?.imageUrl || '',
  },
  {
    id: 6,
    artPieceId: 6,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 6)?.imageUrl || '',
  },
  {
    id: 7,
    artPieceId: 7,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 6)?.imageUrl || '',
  },
  {
    id: 8,
    artPieceId: 8,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 8)?.imageUrl || '',
  },
  {
    id: 9,
    artPieceId: 8,
    userId: 1,
    imageUrl:
      ArtPieces.find((artPiece: ArtPiece) => artPiece.id === 8)?.imageUrl || '',
  },
];

export default UserArtPieceLikes;

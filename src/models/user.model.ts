export interface LoginData {
  email: string;
  password: string;
}

export interface ArtPieceLike {
  id: number;
  userId: number;
  artPieceId: number;
  imageUrl: string;
}

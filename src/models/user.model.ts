export interface LoginData {
  email: string;
  password: string;
}

export interface ResetPasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export interface ArtPieceLike {
  id: number;
  userId: number;
  artPieceId: number;
  imageUrl: string;
}

export interface SignUpData {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  _id: string;
  intro: string;
  profile_image: string;
  cover_image: string;
}
